// src/pages/NotesBySubject.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

type Note = {
  _id: string;
  unit: string;
  description?: string;
  uploader?: string;
  date?: string | null;
  link: string;
  createdAt?: string;
};

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
  const [uploader, setUploader] = useState<string>(""); // optional: uploader name

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

      // Build list of unique units WITHOUT using `[...new Set(...)]`
      const items = data || [];
      const seen: Record<string, boolean> = {};
      const unitsArr: string[] = [];
      items.forEach((n) => {
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
      // Success — reset and refresh
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

  // Group notes by unit for rendering
  const grouped: Record<string, Note[]> = notes.reduce((acc, note) => {
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">{subjectName}</h1>
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
        <div className="text-center py-8 text-gray-500">No notes available for this subject.</div>
      ) : (
        Object.entries(grouped).map(([unitName, unitNotes]) => (
          <section key={unitName} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#154e4a" }}>
              {unitName}
            </h2>
            <ul className="space-y-4">
              {unitNotes.map((note) => (
                <li key={note._id} className="border rounded-xl p-4 shadow-sm bg-white">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{note.description || "No title"}</div>
                      <div className="text-sm text-gray-500">
                        Uploaded by: {note.uploader || "Anonymous"} |{" "}
                        {note.date ? new Date(note.date).toLocaleDateString() : note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ""}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={note.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 font-medium hover:underline"
                      >
                        View
                      </a>
                      <a href={note.link} download className="text-teal-600 font-medium hover:underline">
                        Download
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Upload Note</h2>
            <form className="flex flex-col gap-3" onSubmit={uploadNote}>
              {/* Choose existing unit */}
              <label className="text-sm text-gray-600">Choose existing unit (optional)</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} className="border p-2 rounded-lg">
                <option value="">-- Select an existing unit --</option>
                {availableUnits.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>

              {/* Or type a new unit */}
              <label className="text-sm text-gray-600">Or enter a new unit</label>
              <input
                type="text"
                placeholder="New unit name"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                className="border p-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="Uploader name (optional)"
                value={uploader}
                onChange={(e) => setUploader(e.target.value)}
                className="border p-2 rounded-lg"
              />

              <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded-lg resize-none h-24"
              />

              <input
                type="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="border p-2 rounded-lg"
                required
              />

              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setShowUpload(false)} className="px-4 py-2 rounded-lg border">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
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
