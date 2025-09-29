// src/lib/categoryConfig.ts
import type { EventCategory } from "../types/event";

type RegistrationPolicy = "always" | "auto" | "never";

export type CategoryConfig = {
  scheduleLabel: string;
  registration: RegistrationPolicy; // "always" | "auto" | "never"
  showEligibility: boolean;         // whether we *could* show it (only if DB has text)
  showRules: boolean;               // whether we *could* show it (only if DB has text)
};

export const CATEGORY_CONFIG: Record<EventCategory, CategoryConfig> = {
  Competition: {
    scheduleLabel: "Coding Challenge",
    registration: "always",
    showEligibility: true,
    showRules: true,
  },
  Workshop: {
    scheduleLabel: "Workshop Schedule",
    registration: "always",
    showEligibility: true,
    showRules: true,
  },
  SeminarOrGuestLecture: {
    scheduleLabel: "Talk Schedule",
    registration: "never",
    showEligibility: true,
    showRules: true,
  },
  CulturalOrSocial: {
    scheduleLabel: "Event Schedule",
    registration: "never",
    showEligibility: false,
    showRules: true,
  },
  SportsOrRecreation: {
    scheduleLabel: "Match Schedule",
    registration: "never",
    showEligibility: false,
    showRules: true,
  },
  CommunityOrNetworking: {
    scheduleLabel: "Event Schedule",
    registration: "auto", // show only if registrationLink or registrationEnds provided
    showEligibility: true,
    showRules: true,
  },
};
