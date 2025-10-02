export type Subject = {
  _id: string;
  subject: string;
  course: string;
};

export type SubjectMeta = {
  units: number;
  notes: number;
  lastUpdated: string | null; // ISO string
};

export type NoteLight = {
  unit: string;
  createdAt?: string;
  date?: string | null;
};
