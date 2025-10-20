// src/pages/AcademicRepository.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import theme from "../styles/theme";

type Subject = {
  _id: string;
  subject: string;
  course: string;
};

export default function AcademicRepository() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newCourse, setNewCourse] = useState("");

  useEffect(() => {
    loadSubjects();
  }, []);

  async function loadSubjects() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/subjects");
      const data = await res.json();
      setSubjects(data || []);
    } catch (err) {
      console.error("Error loading subjects:", err);
    }
    setLoading(false);
  }

  async function createSubject(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: newSubject, course: newCourse }),
      });
      if (res.ok) {
        setNewSubject("");
        setNewCourse("");
        setShowCreate(false);
        loadSubjects();
      }
    } catch (err) {
      console.error("Error creating subject:", err);
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: theme.colors.textPrimary }}>
          Academic Repository
        </h1>
        <button
          className="px-4 py-2 rounded-lg font-semibold transition"
          style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
          onClick={() => setShowCreate(true)}
        >
          + Create Subject
        </button>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="text-center py-10" style={{ color: theme.colors.textSecondary }}>
          Loading...
        </div>
      ) : subjects.length === 0 ? (
        <div className="text-center py-10" style={{ color: theme.colors.textSecondary }}>
          No subjects yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((subj) => (
            <motion.div
              key={subj._id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="
                group relative rounded-2xl
                bg-white backdrop-blur-[1px]
                p-6 shadow-sm ring-1 ring-black/5
                transition-all duration-200
                hover:shadow-md hover:-translate-y-[2px]
              "
            >
              <h2 className="text-lg font-semibold truncate" style={{ color: theme.colors.textPrimary }}>
                {subj.subject}
              </h2>
              <p className="mt-1 text-sm truncate" style={{ color: theme.colors.textSecondary }}>
                {subj.course}
              </p>

              <div className="mt-6">
                <Link
                  to={`/notes/${encodeURIComponent(subj.subject)}`}
                  className="
                    inline-flex items-center justify-center
                    rounded-xl px-4 py-2 text-sm font-medium
                    border transition-all duration-200 hover:shadow-sm
                  "
                  style={{
                    borderColor: theme.colors.primary,
                    backgroundColor: theme.colors.white,
                    color: theme.colors.textPrimary, // keep neutral like screenshot
                  }}
                >
                  View Notes
                </Link>
              </div>

              {/* subtle inner outline like the mock */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Subject Modal */}
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.textPrimary }}>
              Create Subject
            </h2>
            <form className="flex flex-col gap-4" onSubmit={createSubject}>
              <input
                type="text"
                placeholder="Subject Name"
                className="border p-3 rounded-lg"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Course Name"
                className="border p-3 rounded-lg"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-semibold transition"
                  style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
