import { useEffect, useState } from "react";

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
};

export default function EventHub() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState({ name: "", date: "", location: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      setFetching(true);
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      setEvents(data || []);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setFetching(false);
    }
  }

  function handleEdit(event: Event) {
    setEditing(event);
    setForm(event);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);
    try {
      await fetch(`http://localhost:5000/api/events/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      await loadEvents();
      setEditing(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this event?")) return;
    try {
      await fetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE" });
      await loadEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📅 Event Hub</h1>

      {editing && (
        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl shadow-md mb-6 flex flex-col gap-3 max-w-xl border">
          <h2 className="text-xl font-semibold mb-2">Edit Event</h2>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Event Name" className="border p-2 rounded" required />
          <input name="date" value={form.date} onChange={handleChange} placeholder="Date (YYYY-MM-DD)" className="border p-2 rounded" required />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" required />
          <div className="flex gap-3">
            <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 transition" disabled={loading}>
              {loading ? "Updating..." : "Update Event"}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="text-red-500 mt-2">Cancel</button>
          </div>
        </form>
      )}

      {fetching ? (
        <p className="text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="border rounded-xl p-5 shadow hover:shadow-lg transition bg-white">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-3">{event.description}</p>
              <div className="text-sm text-gray-500 mb-3">
                <span className="block">📍 {event.location}</span>
                <span className="block">📅 {new Date(event.date).toDateString()}</span>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleEdit(event)} className="text-yellow-600 font-medium hover:underline">Edit</button>
                <button onClick={() => handleDelete(event.id)} className="text-red-600 font-medium hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
