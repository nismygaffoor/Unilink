// src/pages/EventDetails.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPinIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import type { Event } from "../types/event";
import { CATEGORY_CONFIG } from "../lib/categoryConfig";
import theme from "../styles/theme";
const TEAL = "#4CA69B";
const STRIP = "#b0e5e8" ;
const col = "#D8F0F0" ;
export default function EventDetails() {
  const { _id } = useParams<{ _id: string }>(); // route must be /events/:_id
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!_id) return;
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/events/${_id}`);
        if (!res.ok) throw new Error(`Failed (${res.status})`);
        const data = (await res.json()) as Event;
        setEvent({ ...data, image: data.image || "/images/event.png" });
        setErr(null);
      } catch {
        setErr("Could not load this event.");
        setEvent(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [_id]);

  const bannerUrl = useMemo(() => {
    if (!event?.image) return "";
    return `linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.10) 60%), url('${event.image}')`;
  }, [event?.image]);

  if (loading) return <Skeleton />;
  if (err || !event) return <ErrorState message={err || "Event not found"} onBack={() => navigate(-1)} />;

  const cfg = CATEGORY_CONFIG[event.category];
  const hasRegData = !!(event.registrationEnds || event.registrationLink);
  const showRegistration =
    (cfg.registration === "always" && hasRegData) ||
    (cfg.registration === "auto" && hasRegData);
  const scheduleLabel = cfg.scheduleLabel;
  const isCompetition = event.category === "Competition";

  // Prefer a precise start time for the schedule card
  const scheduleWhen =
    event.challengeDate ||
    // fallback: combine date + time if challengeDate wasn't set
    (event.date ? new Date(event.date).toISOString() : undefined);

  return (
    <div className="min-h-screen"
                style={{
    background: `
      linear-gradient(
        to bottom,
        white 0px,
        white 400px,
       #dff5f6 400px,
       #dff5f6 900px, /* hero bottom */
        white 900px,
        white 100%
      )
    `,
  }} >
      {/* Heading */}
      <div className="max-w-[1000px] mx-auto px-4 pt-6">
   <h1
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8"
          style={{ color: "#1f2937" }}
        >          {event.name}
        </h1>
      </div>

      {/* Hero */}
      <section className="relative mt-3">
        <div
          className="h-[260px] md:h-[600px] w-[680px] md:w-[1000px] bg-center bg-cover rounded-2xl mx-4 md:mx-auto"
          style={{ backgroundImage: bannerUrl }}
        />
      </section>

      {/* Event Timeline strip */}
      <div
  className="p-10 pt-0"
  style={{
    background: "#dff5f6"
  }}
>  
      <section className="max-w-[1000px] mx-auto mt-5">
        <div className="rounded-2xl     " >
          <h3 className="text-xl font-bold mb-3" style={{ color: "black" }}>
            Event Timeline
          </h3>
          <hr className="border-t-2 mb-3" style={{ borderColor: STRIP }} />
          <div className="space-y-3">
            {/* Registration (conditional by category + data present) */}
            {showRegistration && (
              <div className="bg-white/85 rounded-lg  p-4 flex items-start justify-between" style={{ backgroundColor: STRIP }}>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Registration Ends</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {fmtDateTime(event.registrationEnds) || "—"}
                    {tzSuffix(event.registrationEnds)}
                  </div>
                </div>
                <a
                  href={event.registrationLink || "#"}
                  className="px-3 py-1.5 text-xs font-semibold rounded-md disabled:opacity-50"
                  style={{ backgroundColor: TEAL, color: "white" }}
                  {...(!event.registrationLink ? { "aria-disabled": true, onClick: (e) => e.preventDefault() } : {})}
                >
                  Register
                </a>
              </div>
            )}

            {/* Schedule / Coding Challenge */}
            <div className="bg-white/85 rounded-lg  p-4" style={{ backgroundColor: STRIP }}>
              <div className="text-xs text-gray-500 mb-1">{scheduleLabel}</div>
              <div className="text-sm text-gray-800">
                {fmtDateTime(scheduleWhen) || (event.time ? `${event.time}` : "—")}
                {tzSuffix(scheduleWhen)}
                {event.durationMinutes ? (
                  <> • Duration: {fmtDuration(event.durationMinutes)}</>
                ) : null}
                {isCompetition && event.loginCloses ? (
                  <> • Login window closes at {event.loginCloses}</>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
</div>
      
      {/* Main details (narrow column) */}
      <section className="max-w-[1000px] mx-auto  mt-8 grid grid-cols-1 gap-6">
        {/* Event Details */}
        <Card title="Event Details">
     <hr className="border-t-2 mb-3" style={{ borderColor: STRIP }} />

          <p className="leading-7 text-gray-700 whitespace-pre-line">
            {event.description || "—"}
          </p>
        </Card>

        {/* Eligibility / Who can participate */}
        {cfg.showEligibility && (
          <Card title={isCompetition ? "Eligibility Criteria" : "Who can participate"}>
            <RichText text={event.eligibility  || ""} />
          </Card>
        )}

        {/* Rules / Other info */}
        {cfg.showRules && (
          <Card title={isCompetition ? "Rules" : "Other Information"}>
            <RichText text={event.rules  || ""} />
          </Card>
        )}
      </section>

      {/* Facts row: only Location + Organizer (date/time already shown above) */}
      <section className="max-w-[1000px] mx-auto  mt-6 mb-10">
        <div className="bg-white/85 rounded-lg  p-4 grid gap-4 md:grid-cols-2" style={{ backgroundColor: STRIP }} >
          <Fact icon={<MapPinIcon className="w-5 h-5 text-gray-500" />} label="" value={event.location} />
           <Fact icon={<AcademicCapIcon className="w-5 h-5 text-gray-500" />} label="" value={`Organized by. ${event.organizer}`} />
        </div>
      </section>
    </div>
  );
}

/* ---------- Helpers & Subcomponents ---------- */

function fmtDateTime(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
  return `${date}, ${time}`;
}

function tzSuffix(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const off = -d.getTimezoneOffset(); // minutes east of UTC
  const sign = off >= 0 ? "+" : "-";
  const abs = Math.abs(off);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  return ` (${sign}${hh}:${mm})`;
}

function fmtDuration(mins?: number) {
  if (!mins || mins <= 0) return "";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h} Hour${h > 1 ? "s" : ""}, ${m} Minute${m !== 1 ? "s" : ""}`;
  if (h) return `${h} Hour${h > 1 ? "s" : ""}`;
  return `${m} Minute${m !== 1 ? "s" : ""}`;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div >
      <h2 className="text-base font-semibold mb-3 text-gray-900">{title}</h2>
      {children}
    </div>
  );
}

function RichText({ text }: { text: string }) {
  const content = (text || "").trim();
  if (!content) return <p className="leading-7 text-gray-500">—</p>;
  const lines = content.split(/\r?\n/).filter(Boolean);
  if (lines.length <= 1) return <p className="leading-7 text-gray-700 whitespace-pre-line">{content}</p>;
  return (
    <ul className="list-disc pl-5 space-y-2 text-gray-700">
      {lines.map((l, i) => (
        <li key={i}>{l}</li>
      ))}
    </ul>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <span className="shrink-0">{icon}</span>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm text-gray-800">{value}</div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="min-h-screen">
      <div className="h-[360px] w-[760px] bg-gray-200 animate-pulse rounded-2xl mx-auto mt-6" />
      <div className="max-w-[760px] mx-auto px-4 mt-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-28 bg-white rounded-2xl ring-1 ring-black/5 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message, onBack }: { message: string; onBack: () => void }) {
  return (
    <div className="max-w-[760px] mx-auto px-4 py-16 text-center">
      <div className="mx-auto w-16 h-16 rounded-2xl mb-4 flex items-center justify-center bg-gray-100">🗓️</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Event Details</h2>
      <p className="text-gray-500 mb-6">{message}</p>
      <button
        onClick={onBack}
        className="px-4 py-2 rounded-xl font-semibold transition hover:shadow-sm"
        style={{ backgroundColor: TEAL, color: "white" }}
      >
        Go back
      </button>
    </div>
  );
}
