// src/types/note.ts
export type Note = {
  _id: string;
  unit: string;
  description?: string;
  uploader?: string;
  date?: string | null;
  link: string;
  createdAt?: string;
};
