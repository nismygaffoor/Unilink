import { events } from '../data/events';

export default function EventHub() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Event Hub</h1>
      <ul className="space-y-4">
        {events.map(event => (
          <li key={event.id} className="border rounded-lg p-4 shadow hover:shadow-xl transition bg-white">
            <h2 className="text-xl font-semibold mb-1">{event.name}</h2>
            <div className="text-gray-700 mb-2">{event.description}</div>
            <div className="text-sm text-gray-500">
              Date: {event.date} | Location: {event.location}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 