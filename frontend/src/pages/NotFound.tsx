// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
