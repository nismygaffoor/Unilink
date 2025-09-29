// src/components/eventhub/EventCard.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import theme from "../../styles/theme";
import type { Event } from "../../types/event";

type EventCardProps = {
  ev: Event;
  fmtDate: (iso: string) => string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function EventCard({ ev, fmtDate, onEdit, onDelete }: EventCardProps) {
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    if (!ev.image) {
      setHasImage(false);
      return;
    }
    const img = new Image();
    img.onload = () => setHasImage(true);
    img.onerror = () => setHasImage(false);
    img.src = ev.image;
  }, [ev.image]);

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-md transition flex flex-col">
      {/* hero (image or placeholder) */}
      <div className="relative h-40 w-full flex items-center justify-center p-4 rounded-2xl">
        {hasImage ? (
          <img
            src={ev.image}
            alt={ev.name}
            className="h-full w-full object-cover rounded-2xl"
          />
        ) : (
          <span className="text-gray-500 text-lg font-medium px-3 text-left">
            {ev.name}
          </span>
        )}

        {/* overflow menu */}
        <button
          className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg shadow ring-1 ring-black/10"
          title="More"
          onClick={(e) => {
            e.preventDefault();
            const menu = (e.currentTarget.nextSibling as HTMLElement) || null;
            if (menu) menu.classList.toggle("hidden");
          }}
        >
          <EllipsisHorizontalIcon className="w-5 h-5 text-gray-600" />
        </button>

        <div className="hidden absolute top-10 right-2 bg-white rounded-lg shadow ring-1 ring-black/10 overflow-hidden">
          <button onClick={onEdit} className="block px-4 py-2 text-left hover:bg-gray-50 w-full">
            Edit
          </button>
          <button
            onClick={onDelete}
            className="block px-4 py-2 text-left text-red-600 hover:bg-gray-50 w-full"
          >
            Delete
          </button>
        </div>
      </div>

      {/* content */}
      <div className="p-5 pt-0 flex flex-col flex-1">
        <div
          className="text-xs md:text-sm font-bold tracking-wide"
          style={{ color: theme.colors.primary }}
        >
          {fmtDate(ev.date).toUpperCase()}
          {ev.time ? ` • ${ev.time.toUpperCase()}` : ""}
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
          {ev.name}
        </h3>

        {(ev.organizer || ev.location) && (
          <div className="text-sm text-gray-500 mb-4">
            Hosted by: {ev.organizer || "—"}
            {ev.location ? ` in ${ev.location}` : ""}
          </div>
        )}

        <div className="mt-auto">
          <Link
            to={`/events/${ev._id}`}
            className="w-full inline-flex justify-center px-4 py-2 rounded-xl font-semibold text-sm transition hover:shadow-sm"
            style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
