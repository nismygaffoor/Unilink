// src/pages/AcademicRepository.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Subject = {
  subject: string;
  course: string;
};

export default function AcademicRepository() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubjects();
  }, []);

  async function loadSubjects() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/notes/subjects");
      const data = await res.json();
      setSubjects(data || []);
    } catch (error) {
      console.error("Error loading subjects:", error);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Academic Repository
      </h1>

      {loading ? (
        <div className="text-center py-8 text-gray-600">Loading...</div>
      ) : subjects.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No subjects available.</div>
      ) : (
        <ul className="space-y-4">
          {subjects.map((subj, index) => (
            <li
              key={index}
              className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition bg-white"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {subj.subject}
              </h2>
              <p className="text-gray-700">{subj.course}</p>
              <Link
                to={`/notes/${encodeURIComponent(subj.subject)}`}
                className="text-teal-600 font-medium hover:underline mt-2 inline-block"
              >
                View Notes →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
