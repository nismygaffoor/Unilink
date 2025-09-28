// src/components/eventhub/EmptyState.tsx
export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-16 h-16 rounded-2xl mb-4 flex items-center justify-center bg-gray-100">
        📅
      </div>
      <h3 className="text-lg font-semibold text-gray-800">No events found</h3>
      <p className="text-gray-500 mt-1">Try changing filters or add a new event.</p>
    </div>
  );
}
