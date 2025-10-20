import { motion } from "framer-motion";
import React from "react";
import theme from "../../styles/theme";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: { subject: string; course: string }) => void;
};

export default function SubjectAddModal({ open, onClose, onSubmit }: Props) {
  const [subject, setSubject] = React.useState("");
  const [course, setCourse] = React.useState("");

  React.useEffect(() => {
    if (!open) {
      setSubject("");
      setCourse("");
    }
  }, [open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !course.trim()) return;
    onSubmit({ subject: subject.trim(), course: course.trim() });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Create Subject</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg border hover:bg-gray-50 transition text-sm"
          >
            Close
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Subject Name"
            className="border p-3 rounded-lg"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Course Name"
            className="border p-3 rounded-lg"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-semibold transition hover:opacity-95"
              style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
            >
              Create
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
