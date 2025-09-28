export default function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          <div className="h-12 w-full bg-gray-200/60 rounded-t-2xl animate-pulse" />
          <div className="p-5 animate-pulse">
            <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-1/3 bg-gray-200 rounded mb-5" />
            <div className="h-9 w-28 rounded-full bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
