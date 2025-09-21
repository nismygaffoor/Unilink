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

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Academic Repository</h1>
        <button
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          onClick={() => setShowCreate(true)}
        >
          + Create Subject
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-600">Loading...</div>
      ) : subjects.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No subjects yet.</div>
      ) : (
        <ul className="space-y-4">
          {subjects.map((subj) => (
            <li
              key={subj._id}
              className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition bg-white flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{subj.subject}</h2>
                <p className="text-gray-700">{subj.course}</p>
              </div>
              <Link
                to={`/notes/${encodeURIComponent(subj.subject)}`}
                className="text-teal-600 font-medium hover:underline"
              >
                View Notes →
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for creating subject */}
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Create Subject</h2>
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
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
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
