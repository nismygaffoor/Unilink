import { motion } from "framer-motion";
import { ArrowDownTrayIcon, EyeIcon } from "@heroicons/react/24/outline";
import theme from "../../styles/theme";
import type { Note } from "../../types/note";

export default function NoteCard({
  note,
  fmtDate,
  fadeItem,
}: {
  note: Note;
  fmtDate: (iso?: string | null) => string;
  fadeItem: any;
}) {
  return (
    <motion.li
      variants={fadeItem}
      className="bg-white border rounded-2xl shadow-sm ring-1 ring-black/5 p-4 md:p-5 hover:shadow-md transition"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div
            className="text-lg font-semibold"
            style={{ color: theme.colors.textPrimary }}
          >
            {note.description || "Untitled"}
          </div>
          <div className="text-sm text-gray-500 mt-0.5">
            {note.uploader ? `${note.uploader} • ` : ""}
            {fmtDate(note.date || note.createdAt)}
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={note.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium border transition hover:shadow-sm focus:outline-none"
            style={{
              borderColor: theme.colors.primary,
              color: theme.colors.primary,
              backgroundColor: theme.colors.white,
            }}
            aria-label="View note"
          >
            <EyeIcon className="w-4 h-4" />
            View
          </a>
          <a
            href={note.link}
            download
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition text-teal-700 hover:bg-teal-50 focus:outline-none"
            aria-label="Download note"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download
          </a>
        </div>
      </div>
    </motion.li>
  );
}
