// src/pages/EventHub.tsx
import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import EventCard from "../components/eventhub/EventCard";
import { SkeletonGrid } from "../components/eventhub/SkeletonGrid";
import { EmptyState } from "../components/eventhub/EmptyState";
import EventFormModal from "../components/eventhub/EventFormModal";
import type { Event } from "../types/event";

export default function EventHub() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editing, setEditing] = useState<Event | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // toolbar state
  const [q, setQ] = useState("");
  const [orgFilter, setOrgFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      setFetching(true);
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      // support both array response and paginated { items: [] }
      const items: Event[] = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
      setEvents(items);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setFetching(false);
    }
  }

  function handleEdit(ev: Event) {
    setEditing(ev);
  }

  // CREATE
  async function handleCreate(values: Partial<Event>) {
    setLoading(true);
    try {
      await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      await loadEvents();
      setCreating(false);
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  }

  // UPDATE
  async function handleUpdate(values: Partial<Event>) {
    if (!editing) return;
    setLoading(true);
    try {
      await fetch(`http://localhost:5000/api/events/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      await loadEvents();
      setEditing(null);
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setLoading(false);
    }
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

  // derived toolbar options
  const organizers = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => e.organizer && set.add(e.organizer));
    return ["All", ...Array.from(set)];
  }, [events]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => e.category && set.add(e.category));
    return ["All", ...Array.from(set)];
  }, [events]);

  // filtering + search
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return events.filter((e) => {
      const orgOk = orgFilter === "All" || e.organizer === orgFilter;
      const catOk = catFilter === "All" || e.category === catFilter;
      const textOk =
        !needle ||
        e.name.toLowerCase().includes(needle) ||
        (e.description || "").toLowerCase().includes(needle) ||
        (e.organizer || "").toLowerCase().includes(needle) ||
        (e.category || "").toLowerCase().includes(needle) ||
        (e.location || "").toLowerCase().includes(needle);
      return orgOk && catOk && textOk;
    });
  }, [events, q, orgFilter, catFilter]);

  const fmtDate = (iso?: string) =>
    iso
      ? new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(iso))
      : "";

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Heading */}
        <h1
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8"
          style={{ color: "#1f2937" }}
        >
          Upcoming Events
        </h1>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-8">
          <div className="relative w-full lg:w-[520px]">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by event, organizer, or keyword..."
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-white shadow-sm ring-1 ring-black/5 focus:outline-none"
            />
          </div>

          <select
            value={orgFilter}
            onChange={(e) => setOrgFilter(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white shadow-sm ring-1 ring-black/5 focus:outline-none"
          >
            <option value="All">Filter by Organizer</option>
            {organizers.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>

          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white shadow-sm ring-1 ring-black/5 focus:outline-none"
          >
            <option value="All">Filter by Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            onClick={() => setCreating(true)}
            className="px-5 py-3 rounded-xl font-semibold shadow-sm transition hover:opacity-95"
            style={{ backgroundColor: "#A6577C", color: "white" }}
          >
            Create Event
          </button>
        </div>

        {/* Grid */}
        {fetching ? (
          <SkeletonGrid />
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((e) => (
              <EventCard
                key={e._id}
                ev={e}
                onEdit={() => handleEdit(e)}
                onDelete={() => handleDelete(e._id)}
                fmtDate={fmtDate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      <EventFormModal
        open={creating}
        title="Create Event"
        initial={null}
        loading={loading}
        onClose={() => setCreating(false)}
        onSubmit={handleCreate}
      />

      {/* Edit Modal */}
      <EventFormModal
        open={!!editing}
        title="Edit Event"
        initial={editing}
        loading={loading}
        onClose={() => setEditing(null)}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
