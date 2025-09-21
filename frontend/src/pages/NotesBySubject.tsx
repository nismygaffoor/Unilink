// src/pages/NotesBySubject.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type Note = {
  id: string;
  unit: string;
  description: string;
  uploader: string;
  date: string;
  link: string;
};

export default function NotesBySubject() {
  const { subject } = useParams<{ subject: string }>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, [subject]);

  async function loadNotes() {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/notes/subject/${encodeURIComponent(subject || "")}`
      );
      const data = await res.json();
      setNotes(data || []);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Notes for {subject}
      </h1>

      {/* Back to repository */}
      <div className="mb-6 text-center">
        <Link
          to="/repository"
          className="inline-block px-4 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition"
        >
          ← Back to Repository
        </Link>
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
              key={note.id}
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
                className="text-teal-600 font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View / Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
