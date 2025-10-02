// src/types/event.ts
export type EventCategory =
  | "Competition"
  | "Workshop"
  | "SeminarOrGuestLecture"
  | "CulturalOrSocial"
  | "SportsOrRecreation"
  | "CommunityOrNetworking";

export type EventMode = "Online" | "Onsite" | "Hybrid";

export type Event = {
  _id: string;

  // Core
  name: string;
  date: string;                  // ISO string (main event date)
  time?: string;                 // start time (e.g., "10:00 AM")
  location: string;
  description?: string;
  organizer?: string;
  category: EventCategory;

  // Media
  image?: string;

  // Registration / schedule
  registrationLink?: string;
  registrationEnds?: string;     // ISO string
  challengeDate?: string;        // ISO string (precise start, used for Competition)
  loginCloses?: string;          // Competition only (plain text, e.g. "2:00 PM +05:30")

  // Info sections
  eligibility?: string;
  rules?: string;

  // Misc
  tags?: string[];
  mode?: EventMode;
  durationMinutes?: number;      // e.g., 720 for "12 hr competition"

  // Meta
  createdAt?: string;
  updatedAt?: string;
};
