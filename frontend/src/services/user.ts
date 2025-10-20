// src/services/user.ts
import { authFetch, plainFetch } from "./http";

export class UserService {
  static async getMe() {
    const res = await authFetch("/api/users/me");
    if (!res.ok) throw new Error("Failed to load profile");
    return res.json();
  }

  static async updateMe(updates: Partial<{ name: string; badge: string }>) {
    const res = await authFetch("/api/users/me", {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update profile");
    return res.json();
  }

  static async getLeaderboard() {
    const res = await plainFetch("/api/users/leaderboard");
    if (!res.ok) throw new Error("Failed to load leaderboard");
    return res.json();
  }

  static async getByUid(uid: string) {
    const res = await plainFetch(`/api/users/${uid}`);
    if (!res.ok) throw new Error("Failed to load user");
    return res.json();
  }
}

//UserService (fetch/update user & leaderboard).