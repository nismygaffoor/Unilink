// models/Event.js
const mongoose = require("mongoose");

const CATEGORY = [
  "Competition",
  "Workshop",
  "SeminarOrGuestLecture",
  "CulturalOrSocial",
  "SportsOrRecreation",
  "CommunityOrNetworking",
];

const MODE = ["Online", "Onsite", "Hybrid"];

const eventSchema = new mongoose.Schema(
  {
    // Core
    name:        { type: String, required: true, trim: true },
    date:        { type: Date,   required: true },          // main event date (ISO)
    time:        { type: String, trim: true },              // start time text (e.g. "10:00 AM")
    location:    { type: String, required: true, trim: true },
    description: { type: String },                          // long text ok
    organizer:   { type: String, trim: true },
    category:    { type: String, enum: CATEGORY, required: true },

    // Media
    image: { type: String, trim: true },

    // Registration / schedule (all optional; FE decides what to show)
    registrationLink: { type: String, trim: true },
    registrationEnds: { type: Date },                       // ISO
    challengeDate:    { type: Date },                       // precise start (used esp. for Competition)
    loginCloses:      { type: String, trim: true },         // Competition only, plain text (e.g. "2:00 PM +05:30")

    // Info sections (rendered as blocks if present)
    eligibility: { type: String },
    rules:       { type: String },

    // Misc
    tags:            { type: [String], default: [] },
    mode:            { type: String, enum: MODE, default: "Onsite" },
    durationMinutes: { type: Number, min: 1 },              // e.g., 720 for 12 hr
  },
  {
    timestamps: true,
    versionKey: false, // don’t add __v
  }
);

// Helpful indexes for listing & filtering
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1, date: 1 });

module.exports = mongoose.model("Event", eventSchema);
