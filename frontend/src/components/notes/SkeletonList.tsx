export function SkeletonList() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white border rounded-2xl shadow-sm ring-1 ring-black/5 p-5 animate-pulse">
          <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-1/5 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
