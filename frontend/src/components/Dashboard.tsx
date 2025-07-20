export default function Dashboard() {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-700">Welcome to UniLink</h1>
      <p className="text-lg text-gray-600 mb-6">
        The central hub for Sri Lankan university students to share, learn, and connect.
      </p>
      <div className="flex justify-center gap-4">
        <a href="/repository" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-800 transition">Academic Repository</a>
        <a href="/events" className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 transition">Event Hub</a>
        <a href="/forum" className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-800 transition">Community Forum</a>
      </div>
    </div>
  );
} 