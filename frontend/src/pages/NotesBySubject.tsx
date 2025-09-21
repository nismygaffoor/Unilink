// src/pages/NotesBySubject.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

type Note = {
  _id: string;
  unit: string;
  description: string;
  uploader: string;
  date: string;
  link: string;
};

export default function NotesBySubject() {
  const { subject } = useParams<{ subject: string }>();
  const subjectName = subject || ""; // fallback to empty string

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload modal state
  const [showUpload, setShowUpload] = useState(false);
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (subjectName) loadNotes();
  }, [subjectName]);

  async function loadNotes() {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/notes/subject/${encodeURIComponent(subjectName)}`
      );
      const data = await res.json();
      setNotes(data || []);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
    setLoading(false);
  }

  async function uploadNote(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("subject", subjectName);
    formData.append("unit", unit);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setUnit("");
        setDescription("");
        setFile(null);
        setShowUpload(false);
        loadNotes(); // refresh notes
      }
    } catch (err) {
      console.error("Error uploading note:", err);
    }
  }

  if (!subjectName) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center text-gray-600">
        Invalid subject.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center flex-1">
          Notes for {subjectName}
        </h1>
        <button
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          onClick={() => setShowUpload(true)}
        >
          + Upload Note
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-600">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No notes available for this subject.
        </div>
      ) : (
        <ul className="space-y-6">
          {notes.map((note) => (
            <li
              key={note._id}
              className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition bg-white"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                {note.unit}
              </h2>
              <p className="text-gray-700 mb-3">{note.description}</p>
              <div className="text-sm text-gray-500 mb-3">
                Uploaded by: {note.uploader} | Date: {note.date}
              </div>
              <a
                href={note.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 font-medium hover:underline mr-4"
              >
                View
              </a>
              <a
                href={note.link}
                download
                className="text-teal-600 font-medium hover:underline"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Upload Note</h2>
            <form className="flex flex-col gap-4" onSubmit={uploadNote}>
              <input
                type="text"
                placeholder="Unit Name"
                className="border p-3 rounded-lg"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="border p-3 rounded-lg resize-none h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="file"
                className="border p-3 rounded-lg"
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
                  onClick={() => setShowUpload(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                >
                  Upload
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
