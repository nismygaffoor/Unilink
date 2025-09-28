import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-16 h-16 rounded-2xl mb-4 flex items-center justify-center bg-gray-100">
        <AcademicCapIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">No subjects found</h3>
      <p className="text-gray-500 mt-1">Create a subject to get started.</p>
    </div>
  );
}
