// src/components/eventhub/SkeletonGrid.tsx
export function SkeletonGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden animate-pulse"
        >
          <div className="h-40 bg-gray-200" />
          <div className="p-5">
            <div className="h-3.5 w-1/2 bg-gray-200 rounded mb-3" />
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-3" />
            <div className="h-9 w-full bg-gray-200 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
