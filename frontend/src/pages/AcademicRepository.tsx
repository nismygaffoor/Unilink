import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import theme from "../styles/theme";

// types
import type { Subject, SubjectMeta, NoteLight } from "../types/subject";

// split UI pieces
import SubjectCard from "../components/repository/SubjectCard";
import SkeletonGrid from "../components/repository/SkeletonGrid";
import EmptyState from "../components/repository/EmptyState";
import SubjectAddModal from "../components/repository/SubjectAddModal";

export default function AcademicRepository() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  // add-subject modal (separate component)
  const [showCreate, setShowCreate] = useState(false);

  // simple upload-note modal (kept local to this page)
  const [showUpload, setShowUpload] = useState(false);
  const [uploadSubject, setUploadSubject] = useState<string>("");

  // per-subject metadata computed from notes
  const [meta, setMeta] = useState<Record<string, SubjectMeta>>({});

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    if (subjects.length) {
      loadAllMeta();
    } else {
      setMeta({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects]);

  async function loadSubjects() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/subjects");
      const data: Subject[] = await res.json();
      setSubjects(data || []);
    } catch (err) {
      console.error("Error loading subjects:", err);
    } finally {
      setLoading(false);
    }
  }

  // fetch notes for each subject and compute units/notes/lastUpdated
  async function loadAllMeta() {
    try {
      const entries = await Promise.all(
        subjects.map(async (s) => {
          try {
            const r = await fetch(
              `http://localhost:5000/api/notes/subject/${encodeURIComponent(s.subject)}`
            );
            const notes: NoteLight[] = (await r.json()) || [];

            // count unique units
            const seen: Record<string, true> = {};
            let units = 0;
            notes.forEach((n) => {
              const u = (n.unit || "").trim();
              if (u && !seen[u]) {
                seen[u] = true;
                units++;
              }
            });

            // last updated = max of createdAt/date
            let lastISO: string | null = null;
            notes.forEach((n) => {
              const iso = (n.date as string) || n.createdAt || null;
              if (iso) {
                const t = new Date(iso).getTime();
                if (!lastISO || t > new Date(lastISO).getTime()) {
                  lastISO = new Date(t).toISOString();
                }
              }
            });

            return [s._id, { units, notes: notes.length, lastUpdated: lastISO }] as const;
          } catch {
            return [s._id, { units: 0, notes: 0, lastUpdated: null }] as const;
          }
        })
      );

      const m: Record<string, SubjectMeta> = {};
      entries.forEach(([id, v]) => (m[id] = v));
      setMeta(m);
    } catch (e) {
      console.error("meta error", e);
    }
  }

  // called by SubjectAddModal
  async function handleCreateSubject(payload: { subject: string; course: string }) {
    try {
      const res = await fetch("http://localhost:5000/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setShowCreate(false);
        await loadSubjects();
      }
    } catch (err) {
      console.error("Error creating subject:", err);
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  };

  function fmtDate(iso: string | null) {
    if (!iso) return "—";
    try {
      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(iso));
    } catch {
      return "—";
    }
  }

  return (
    <div className="min-h-screen">
      <div className="py-5">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 mt-0">
            <div>
              <h1
                className="text-3xl md:text-4xl font-extrabold tracking-tight"
                style={{ color: theme.colors.textPrimary }}
              >
                Academic Repository
              </h1>
            </div>

            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-sm transition hover:opacity-95"
              style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
              onClick={() => setShowCreate(true)}
            >
              <PlusIcon className="w-5 h-5" /> Create Subject
            </button>
          </div>

          {/* Cards */}
          {loading ? (
            <SkeletonGrid />
          ) : subjects.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {subjects.map((s) => {
                const m = meta[s._id] || { units: 0, notes: 0, lastUpdated: null };
                return (
                  <motion.div
                    key={s._id}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    <SubjectCard
                      subject={s.subject}
                      course={s.course}
                      meta={m}
                      fmtDate={fmtDate}
                      onUploadClick={() => {
                        setUploadSubject(s.subject);
                        setShowUpload(true);
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Subject Add Modal (separate file) */}
      <SubjectAddModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreateSubject}
      />

      {/* Simple Upload Note Modal (kept local) */}
      {showUpload && (
        <LocalModal title={`Upload Note — ${uploadSubject}`} onClose={() => setShowUpload(false)}>
          <div className="text-sm text-gray-600">
            Use your existing upload flow for{" "}
            <span className="font-semibold">{uploadSubject}</span>.
          </div>
          <div className="flex justify-end mt-4">
            <Link
              to={`/notes/${encodeURIComponent(uploadSubject)}`}
              className="px-4 py-2 rounded-lg font-semibold transition hover:opacity-95"
              style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
              onClick={() => setShowUpload(false)}
            >
              Go to Notes
            </Link>
          </div>
        </LocalModal>
      )}
    </div>
  );
}

/* ------- tiny local modal just for the Upload Note shortcut ------- */
function LocalModal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg border hover:bg-gray-50 transition text-sm"
          >
            Close
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
