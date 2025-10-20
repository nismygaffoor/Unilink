// controllers/eventController.js
const Event = require("../models/Event");

// Only allow fields the frontend actually uses
const ALLOWED_FIELDS = [
  "name",
  "date",
  "time",
  "location",
  "description",
  "organizer",
  "category",
  "image",
  "registrationLink",
  "registrationEnds",
  "challengeDate",
  "loginCloses",
  "eligibility",
  "rules",
  "tags",
  "mode",
  "durationMinutes",
];

/** Coerce incoming payload (from forms) to proper types and strip empties */
function coerceEventPayload(body = {}) {
  const out = {};

  for (const key of ALLOWED_FIELDS) {
    if (!(key in body)) continue;
    let val = body[key];

    // Normalize empty strings -> undefined
    if (typeof val === "string" && val.trim() === "") {
      val = undefined;
    }

    // Date fields
    if (["date", "registrationEnds", "challengeDate"].includes(key)) {
      const d = val ? new Date(val) : undefined;
      out[key] = d && !isNaN(d) ? d : undefined;
      continue;
    }

    // Numeric fields
    if (key === "durationMinutes") {
      if (val === undefined || val === null || val === "") {
        out[key] = undefined;
      } else {
        const n = Number(val);
        out[key] = Number.isFinite(n) && n > 0 ? n : undefined;
      }
      continue;
    }

    // Tags: allow CSV or array
    if (key === "tags") {
      if (Array.isArray(val)) {
        const arr = val.map(String).map((t) => t.trim()).filter(Boolean);
        out.tags = arr.length ? arr : undefined;
      } else if (typeof val === "string") {
        const arr = val.split(",").map((t) => t.trim()).filter(Boolean);
        out.tags = arr.length ? arr : undefined;
      } else {
        out.tags = undefined;
      }
      continue;
    }

    // Trim strings generally
    if (typeof val === "string") {
      out[key] = val.trim();
      continue;
    }

    // Pass through other allowed types
    out[key] = val ?? undefined;
  }

  return out;
}

// GET all events (sorted by date ascending)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }).lean();
    res.json(events);
  } catch (err) {
    console.error("getEvents error:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// CREATE event
exports.createEvent = async (req, res) => {
  try {
    const payload = coerceEventPayload(req.body);
    const event = new Event(payload);
    const saved = await event.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("createEvent error:", err);
    res.status(400).json({ error: err.message || "Failed to create event" });
  }
};

// UPDATE event
exports.updateEvent = async (req, res) => {
  try {
    const payload = coerceEventPayload(req.body);

  const updated = await Event.findByIdAndUpdate(req.params._id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ error: "Event not found" });
    res.json(updated);
  } catch (err) {
    console.error("updateEvent error:", err);
    res.status(400).json({ error: err.message || "Failed to update event" });
  }
};

// DELETE event
exports.deleteEvent = async (req, res) => {
  try {
  const deleted = await Event.findByIdAndDelete(req.params._id);
    if (!deleted) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error("deleteEvent error:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

// GET single event by ID
exports.getEventById = async (req, res) => {
  try {
  const event = await Event.findById(req.params._id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error("getEventById error:", err);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};
