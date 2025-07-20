import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 p-4 text-white flex gap-6 shadow-lg rounded-b-lg">
      <Link className="hover:underline hover:text-yellow-300 transition" to="/">Dashboard</Link>
      <Link className="hover:underline hover:text-yellow-300 transition" to="/repository">Academic Repository</Link>
      <Link className="hover:underline hover:text-yellow-300 transition" to="/events">Event Hub</Link>
      <Link className="hover:underline hover:text-yellow-300 transition" to="/forum">Community Forum</Link>
    </nav>
  );
} 