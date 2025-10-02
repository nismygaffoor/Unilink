import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  FolderIcon,
  DocumentTextIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import theme from "../../styles/theme";
import type { SubjectMeta } from "../../types/subject";

export default function SubjectCard({
  subject,
  course,
  meta,
  fmtDate,
  onUploadClick,
}: {
  subject: string;
  course: string;
  meta: SubjectMeta;
  fmtDate: (iso: string | null) => string;
  onUploadClick: () => void;
}) {
  return (
    <div className="rounded-2xl shadow-sm ring-1 ring-black/5 bg-white overflow-hidden hover:shadow-md transition">
      {/* header strip */}
      <div
        className="px-5 py-3"
        style={{
          background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          color: theme.colors.white,
        }}
      >
        <div className="flex items-center gap-2">
          <AcademicCapIcon className="w-5 h-5 text-white/90" />
          <h2 className="text-lg font-semibold truncate">{subject}</h2>
        </div>
      </div>

      {/* body */}
      <div className="px-5 py-4 items-center">
        <MetaRow icon={<FolderIcon className="w-4 h-4" />} label="Course" value={course} />
        <MetaRow
          icon={<DocumentTextIcon className="w-4 h-4" />}
          label="Units | Notes"
          value={`${meta.units} units | ${meta.notes} notes`}
        />
        <MetaRow
          icon={<ClockIcon className="w-4 h-4" />}
          label="Last updated"
          value={fmtDate(meta.lastUpdated)}
          muted
        />

        <div className="flex md:flex-col gap-3 justify-end mt-3">
          <Link
            to={`/notes/${encodeURIComponent(subject)}`}
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium border transition hover:shadow-sm"
            style={{
              borderColor: theme.colors.primary,
              color: theme.colors.primary,
              backgroundColor: theme.colors.white,
            }}
          >
            View Notes
          </Link>
          <button
            onClick={onUploadClick}
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition hover:opacity-95"
            style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
          >
            Upload Note
          </button>
        </div>
      </div>
    </div>
  );
}

/* kept inside this file for simplicity */
function MetaRow({
  icon,
  label,
  value,
  muted,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 text-sm mb-1">
      <span className="text-gray-400">{icon}</span>
      <span className="text-gray-500">{label}:</span>
      <span className={muted ? "text-gray-500" : "text-gray-800"}>{value}</span>
    </div>
  );
}
