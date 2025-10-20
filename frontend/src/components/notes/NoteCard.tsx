import { motion } from "framer-motion";
import { ArrowDownTrayIcon, EyeIcon } from "@heroicons/react/24/outline";
import theme from "../../styles/theme";
import type { Note } from "../../types/note";
import { API_BASE } from "../../services/http";   // ✅ to build full file URL

export default function NoteCard({
  note,
  fmtDate,
  fadeItem,
}: {
  note: Note;
  fmtDate: (iso?: string | null) => string;
  fadeItem: any;
}) {
  // Build full URL for file
  const fileUrl = `${API_BASE}/${note.filePath}`;

  return (
    <motion.li
      variants={fadeItem}
      className="bg-white border rounded-2xl shadow-sm ring-1 ring-black/5 p-3 md:p-4 hover:shadow-md transition"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left side info */}
        <div className="flex items-center gap-3">
          <div
            className="h-12 w-1 rounded"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <div>
            <div
              className="text-lg font-semibold"
              style={{ color: theme.colors.textPrimary }}
            >
              {note.description || "Untitled"}
            </div>
            <div className="text-sm text-gray-500 mt-0.5">
              {`uploaded by ${note.author ? `${note.author} • ` : ""}`}
              {fmtDate(note.createdAt)}
            </div>
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex gap-2">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium border transition hover:shadow-sm focus:outline-none"
            style={{
              borderColor: theme.colors.primary,
              color: theme.colors.primary,
              backgroundColor: theme.colors.white,
            }}
          >
            <EyeIcon className="w-4 h-4" />
            View
          </a>
          <a
            href={fileUrl}
            download
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition text-teal-700 hover:bg-teal-50 focus:outline-none"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download
          </a>
        </div>
      </div>
    </motion.li>
  );
}
