export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-14 h-14 rounded-2xl mb-4 flex items-center justify-center bg-gray-100 text-gray-400">
        📝
      </div>
      <h3 className="text-lg font-semibold text-gray-800">No notes found</h3>
      <p className="text-gray-500 mt-1">Try searching or upload a new note.</p>
    </div>
  );
}
