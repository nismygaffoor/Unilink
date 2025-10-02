import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import theme from "../styles/theme";

import type { Note } from "../types/note";
import NoteCard from "../components/notes/NoteCard";
import UploadNoteModal from "../components/notes/UploadNoteModal";
import { SkeletonList } from "../components/notes/SkeletonList";
import { EmptyState } from "../components/notes/EmptyState";

const STRIP = "#b0e5e8" ;


export default function NotesBySubject() {
  const { subject } = useParams<{ subject: string }>();
  const subjectName = subject || "";

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Upload modal state
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [unit, setUnit] = useState<string>("");
  const [newUnit, setNewUnit] = useState<string>("");
  const [availableUnits, setAvailableUnits] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploader, setUploader] = useState<string>("");

  // UI: search/sort
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<"newest" | "oldest" | "title">("newest");

  useEffect(() => {
    if (subjectName) loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectName]);

  async function loadNotes() {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/notes/subject/${encodeURIComponent(subjectName)}`
      );
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data: Note[] = await res.json();
      setNotes(data || []);

      // unique units
      const seen: Record<string, boolean> = {};
      const unitsArr: string[] = [];
      (data || []).forEach((n) => {
        const u = (n.unit || "Untitled").trim();
        if (u && !seen[u]) {
          seen[u] = true;
          unitsArr.push(u);
        }
      });
      setAvailableUnits(unitsArr);
    } catch (err) {
      console.error("Error loading notes:", err);
      setNotes([]);
      setAvailableUnits([]);
    } finally {
      setLoading(false);
    }
  }

  // Upload handler (FormData -> backend multer)
  async function uploadNote(e: React.FormEvent) {
    e.preventDefault();
    const chosenUnit = (newUnit || unit).trim();
    if (!chosenUnit) return alert("Please select or enter a unit name.");
    if (!file) return alert("Please select a file to upload.");

    const formData = new FormData();
    formData.append("subject", subjectName);
    formData.append("unit", chosenUnit);
    formData.append("description", description);
    formData.append("uploader", uploader || "Anonymous");
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Upload failed (${res.status}): ${text}`);
      }
      setUnit("");
      setNewUnit("");
      setDescription("");
      setFile(null);
      setUploader("");
      setShowUpload(false);
      await loadNotes();
    } catch (err) {
      console.error("Error uploading note:", err);
      alert("Upload failed. Check console for details.");
    }
  }

  // ------- UI helpers / animations -------
  const fadeParent = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };
  const fadeItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  };
  const fmtDate = (iso?: string | null) => {
    if (!iso) return "";
    try {
      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(iso));
    } catch {
      return "";
    }
  };

  // search + sort
  const filteredSorted = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const copy = [...notes].filter((n) => {
      if (!needle) return true;
      return (
        (n.description || "").toLowerCase().includes(needle) ||
        (n.unit || "").toLowerCase().includes(needle) ||
        (n.uploader || "").toLowerCase().includes(needle)
      );
    });
    copy.sort((a, b) => {
      if (sortKey === "title") {
        return (a.description || "").localeCompare(b.description || "");
      }
      const ad = new Date(a.date || a.createdAt || 0).getTime();
      const bd = new Date(b.date || b.createdAt || 0).getTime();
      return sortKey === "newest" ? bd - ad : ad - bd;
    });
    return copy;
  }, [notes, q, sortKey]);

  // group by unit after filtering
  const grouped: Record<string, Note[]> = filteredSorted.reduce((acc, note) => {
    const key = (note.unit || "Untitled").trim();
    if (!acc[key]) acc[key] = [];
    acc[key].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  if (!subjectName) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center text-gray-600">
        Invalid subject.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Header + Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1
          className="text-3xl md:text-4xl font-extrabold tracking-tight"
          style={{ color: theme.colors.textPrimary }}
        >
          {subjectName}
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          {/* search */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search notes…"
              className="w-64 pl-10 pr-3 py-2 rounded-lg bg-white shadow-sm ring-1 ring-black/5 focus:outline-none"
            />
          </div>

          {/* sort */}
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
            className="px-3 py-2 rounded-lg bg-white shadow-sm ring-1 ring-black/5 focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title (A–Z)</option>
          </select>

          {/* upload */}
          <button
            className="px-4 py-2 rounded-lg font-semibold shadow-sm transition hover:opacity-95"
            style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
            onClick={() => setShowUpload(true)}
          >
            + Upload Note
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <SkeletonList />
      ) : filteredSorted.length === 0 ? (
        <EmptyState />
      ) : (
        Object.entries(grouped).map(([unitName, unitNotes]) => (
          <section key={unitName} className="mb-10">
            {/* Unit chip/heading */}

          <div className="bg-white/85 rounded-3xl mb-4  p-1 pl-4 pr-4 flex w-fit items-start justify-between"                      style={{ backgroundColor: theme.colors.primary }}
          >
              <p
                className="text-xl font-semibold"
                style={{ color: theme.colors.white }}
              >
                {unitName}
              </p>
            </div>

            {/* Notes */}
            <motion.ul
              variants={fadeParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-3"
            >
              {unitNotes.map((note) => (
                <NoteCard key={note._id} note={note} fmtDate={fmtDate} fadeItem={fadeItem} />
              ))}
            </motion.ul>
          </section>
        ))
      )}

      {/* Upload Modal */}
      <UploadNoteModal
        open={showUpload}
        availableUnits={availableUnits}
        unit={unit}
        setUnit={setUnit}
        newUnit={newUnit}
        setNewUnit={setNewUnit}
        uploader={uploader}
        setUploader={setUploader}
        description={description}
        setDescription={setDescription}
        setFile={setFile}
        onClose={() => setShowUpload(false)}
        onSubmit={uploadNote}
      />
    </div>
  );
}
