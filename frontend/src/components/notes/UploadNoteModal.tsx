import { motion } from "framer-motion";
import theme from "../../styles/theme";

export default function UploadNoteModal({
  open,
  availableUnits,
  unit,
  setUnit,
  newUnit,
  setNewUnit,
  description,
  setDescription,
  setFile,
  onClose,
  onSubmit,
}: {
  open: boolean;
  availableUnits: string[];
  unit: string;
  setUnit: (v: string) => void;
  newUnit: string;
  setNewUnit: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  setFile: (f: File | null) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#1f2937" }}>
          Upload Note
        </h2>

        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <label className="text-sm text-gray-600">Choose existing unit (optional)</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">-- Select an existing unit --</option>
            {availableUnits.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <label className="text-sm text-gray-600">Or enter a new unit</label>
          <input
            type="text"
            placeholder="New unit name"
            value={newUnit}
            onChange={(e) => setNewUnit(e.target.value)}
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
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-semibold transition hover:opacity-95"
              style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
            >
              Upload
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
