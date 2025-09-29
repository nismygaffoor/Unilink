// src/components/eventhub/EventFormModal.tsx
import { useEffect, useState } from "react";
import theme from "../../styles/theme";
import type { Event, EventCategory } from "../../types/event";
import { CATEGORY_CONFIG } from "../../lib/categoryConfig";

/** In-form values (allow "" for category while editing) */
type EventFormValues =
  Partial<Omit<Event, "_id" | "createdAt" | "updatedAt" | "category">> & {
    category?: Event["category"] | "";
  };

export default function EventFormModal({
  open,
  title = "Edit Event",
  initial,
  loading = false,
  onClose,
  onSubmit,
}: {
  open: boolean;
  title?: string;
  initial: Partial<Event> | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<Event>) => Promise<void> | void;
}) {
  const [values, setValues] = useState<EventFormValues>({
    // Core
    name: "",
    category: "",
    organizer: "",
    location: "",
    image: "",
    description: "",

    // Generic schedule (non-competition)
    date: "",
    time: "",

    // Competition schedule
    challengeDate: "",
    loginCloses: "",
    durationMinutes: undefined,

    // Registration (optional)
    registrationLink: "",
    registrationEnds: "",

    // Info blocks
    eligibility: "",
    rules: "",

    // Misc
    tags: [],
    mode: "Onsite",
  });

  // hydrate / reset
  useEffect(() => {
    if (initial) {
      setValues((v) => ({
        ...v,
        ...initial,
        category: (initial.category as Event["category"]) ?? "",
        image: initial.image ?? v.image ?? "",
        organizer: initial.organizer ?? v.organizer ?? "",
      }));
    } else {
      setValues({
        name: "",
        category: "",
        organizer: "",
        location: "",
        image: "",
        description: "",
        date: "",
        time: "",
        challengeDate: "",
        loginCloses: "",
        durationMinutes: undefined,
        registrationLink: "",
        registrationEnds: "",
        eligibility: "",
        rules: "",
        tags: [],
        mode: "Onsite",
      });
    }
  }, [initial]);

  const category = (values.category || undefined) as EventCategory | undefined;
  const cfg = category ? CATEGORY_CONFIG[category] : undefined;
  const isCompetition = category === "Competition";

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    if (name === "durationMinutes") {
      setValues((v) => ({
        ...v,
        durationMinutes: value === "" ? undefined : Number(value),
      }));
      return;
    }

    if (name === "tags") {
      const arr = value.split(",").map((t) => t.trim()).filter(Boolean);
      setValues((v) => ({ ...v, tags: arr }));
      return;
    }

    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;

    if (name === "category") {
      setValues((v) => ({
        ...v,
        // allow "" during editing; API coercion will drop it
        category: value === "" ? undefined : (value as Event["category"]),
      }));
      return;
    }

    if (name === "mode") {
      setValues((v) => ({
        ...v,
        mode: value as NonNullable<Event["mode"]>,
      }));
      return;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: Partial<Event> = {
      ...values,
      category: (values.category as EventCategory) || undefined,
      image: values.image || undefined,
      organizer: values.organizer || undefined,
      description: values.description || undefined,

      // Schedule
      date: values.date || undefined,
      time: values.time || undefined,
      challengeDate: values.challengeDate || undefined,
      durationMinutes:
        values.durationMinutes && values.durationMinutes > 0
          ? values.durationMinutes
          : undefined,
      loginCloses: values.loginCloses || undefined,

      // Registration
      registrationLink: values.registrationLink || undefined,
      registrationEnds: values.registrationEnds || undefined,

      // Info blocks
      eligibility: values.eligibility || undefined,
      rules: values.rules || undefined,

      tags: values.tags && values.tags.length ? values.tags : undefined,
      mode: values.mode || "Onsite",
    };

    await onSubmit(payload);
  }

  if (!open) return null;

  // UI helpers
  const showRegInputs =
    !!category &&
    (CATEGORY_CONFIG[category].registration === "always" ||
      CATEGORY_CONFIG[category].registration === "auto");

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* center + scrollable modal */}
      <div className="relative flex min-h-full items-center justify-center p-4 overflow-y-auto">
        <div
          className="relative w-full max-w-2xl rounded-2xl shadow-xl ring-1 ring-black/10 bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="max-h-[85vh] overflow-y-auto p-6"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <h2 className="text-xl font-semibold mb-4" style={{ color: "#1f2937" }}>
              {title}
            </h2>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              {/* Category FIRST */}
              <select
                name="category"
                value={values.category ?? ""}
                onChange={handleSelectChange}
                className="border p-3 rounded-lg"
                required
              >
                <option value="">Select category</option>
                <option value="Competition">Competition</option>
                <option value="Workshop">Workshop</option>
                <option value="SeminarOrGuestLecture">Seminar / Guest Lecture</option>
                <option value="CulturalOrSocial">Cultural & Social</option>
                <option value="SportsOrRecreation">Sports & Recreation</option>
                <option value="CommunityOrNetworking">Community & Networking</option>
              </select>

              {/* Core info */}
              <input
                name="name"
                value={values.name || ""}
                onChange={handleChange}
                placeholder="Event name"
                className="border p-3 rounded-lg"
                required
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  name="organizer"
                  value={values.organizer || ""}
                  onChange={handleChange}
                  placeholder="Organizer (University / Club / Company)"
                  className="border p-3 rounded-lg"
                />
                <input
                  name="location"
                  value={values.location || ""}
                  onChange={handleChange}
                  placeholder="Location / Link"
                  className="border p-3 rounded-lg"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  name="image"
                  value={values.image || ""}
                  onChange={handleChange}
                  placeholder="Image URL (optional)"
                  className="border p-3 rounded-lg"
                />
                <select
                  name="mode"
                  value={values.mode ?? "Onsite"}
                  onChange={handleSelectChange}
                  className="border p-3 rounded-lg"
                >
                  <option value="Onsite">Onsite</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <textarea
                name="description"
                value={values.description || ""}
                onChange={handleChange}
                placeholder="Event details"
                className="border p-3 rounded-lg min-h-28"
                required
              />

              {/* Schedule block (depends on category) */}
              {isCompetition ? (
                <>
                  <label className="text-sm font-semibold text-gray-700 mt-1">
                    Coding Challenge
                  </label>
                  <label className="text-xs font-medium text-gray-500">
                    Challenge happening date & time
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      name="challengeDate"
                      type="datetime-local"
                      value={values.challengeDate || ""}
                      onChange={handleChange}
                      className="border p-3 rounded-lg"
                      placeholder="Start (date & time)"
                      required
                    />
                    <input
                      name="durationMinutes"
                      type="number"
                      min={1}
                      value={values.durationMinutes ?? ""}
                      onChange={handleChange}
                      placeholder="Duration (minutes)"
                      className="border p-3 rounded-lg"
                      required
                    />
                  </div>
                  {/* Optional: login window close text */}
                  <input
                    name="loginCloses"
                    value={values.loginCloses || ""}
                    onChange={handleChange}
                    placeholder="Login window closes at (optional)"
                    className="border p-3 rounded-lg"
                  />
                </>
              ) : (
                <>
                  <label className="text-sm font-semibold text-gray-700 mt-1">
                    Schedule
                  </label>
                  <label className="text-xs font-medium text-gray-500">
                    Happening date, time & duration
                  </label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <input
                      name="date"
                      type="date"
                      value={values.date?.slice(0, 10) || ""}
                      onChange={handleChange}
                      className="border p-3 rounded-lg"
                      placeholder="Happening date"
                      required
                    />
                    <input
                      name="time"
                      value={values.time || ""}
                      onChange={handleChange}
                      placeholder="Time (e.g., 2:00 PM)"
                      className="border p-3 rounded-lg"
                      required
                    />
                    <input
                      name="durationMinutes"
                      type="number"
                      min={1}
                      value={values.durationMinutes ?? ""}
                      onChange={handleChange}
                      placeholder="Duration (minutes)"
                      className="border p-3 rounded-lg"
                    />
                  </div>
                </>
              )}

              {/* Registration (conditional) */}
              {showRegInputs && (
                <>
                  <label className="text-sm font-semibold text-gray-700 mt-1">
                    Registration (optional)
                  </label>
                  <label className="text-xs font-medium text-gray-500">
                    Registration closing date & time
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      name="registrationEnds"
                      type="datetime-local"
                      value={values.registrationEnds || ""}
                      onChange={handleChange}
                      className="border p-3 rounded-lg"
                    />
                    <input
                      name="registrationLink"
                      value={values.registrationLink || ""}
                      onChange={handleChange}
                      placeholder="Registration link"
                      className="border p-3 rounded-lg"
                    />
                  </div>
                </>
              )}

              {/* Audience / Rules (optional) */}
              {cfg?.showEligibility && (
                <textarea
                  name="eligibility"
                  value={values.eligibility || ""}
                  onChange={handleChange}
                  placeholder="Who can participate (optional)"
                  className="border p-3 rounded-lg min-h-24"
                />
              )}
              {cfg?.showRules && (
                <textarea
                  name="rules"
                  value={values.rules || ""}
                  onChange={handleChange}
                  placeholder={isCompetition ? "Rules (optional)" : "Other information (optional)"}
                  className="border p-3 rounded-lg min-h-24"
                />
              )}

              {/* Meta */}
              <input
                name="tags"
                value={(values.tags ?? []).join(", ")}
                onChange={handleChange}
                placeholder="Tags (comma separated)"
                className="border p-3 rounded-lg"
              />

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg font-semibold transition hover:opacity-95 disabled:opacity-60"
                  style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
