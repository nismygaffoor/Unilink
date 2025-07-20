import { notes } from '../data/notes';

export default function AcademicRepository() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Academic Repository</h1>
      <ul className="space-y-4">
        {notes.map(note => (
          <li key={note.id} className="border rounded-lg p-4 shadow hover:shadow-xl transition bg-white">
            <h2 className="text-xl font-semibold mb-1">{note.title}</h2>
            <p className="text-gray-700 mb-2">{note.description}</p>
            <div className="text-sm text-gray-500 mb-2">
              Uploaded by: {note.uploader} | Date: {note.date}
            </div>
            <a href={note.link} className="text-blue-600 underline mt-2 inline-block">View/Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
} 