import { authFetch } from "./http";

export class NoteService {
  static async createNote(formData: FormData) {
    const res = await authFetch("/api/notes", {
      method: "POST",
      body: formData, // includes file + fields
    });
    if (!res.ok) throw new Error("Failed to upload note");
    return res.json();
  }

  static async getNotesBySubject(subject: string) {
    const res = await authFetch(`/api/notes/subject/${subject}`);
    if (!res.ok) throw new Error("Failed to fetch notes");
    return res.json();
  }
}
