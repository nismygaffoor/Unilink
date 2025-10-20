// src/services/auth.ts
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const API_BASE = "http://localhost:5000"; // adjust if needed

export class AuthService {
  // Sign up with email/password (Firebase) + ensure Mongo profile
  static async signUp(email: string, password: string, name: string) {
    try {
      if (!this.isUniversityEmail(email)) {
        return { success: false, error: "Please use your university email address" };
      }

      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // Set display name in Firebase
      await updateProfile(user, { displayName: name });

      // 🔑 Ensure Mongo profile
      const token = await user.getIdToken();
      await fetch(`${API_BASE}/api/auth/ensureProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      return {
        success: true,
        user: { uid: user.uid, email: user.email, displayName: user.displayName },
      };
    } catch (error: any) {
      return { success: false, error: error?.message || "Sign up failed" };
    }
  }

  // Sign in with email/password (Firebase) + ensure Mongo profile
  static async signIn(email: string, password: string) {
    try {
      if (!this.isUniversityEmail(email)) {
        return { success: false, error: "Please use your university email address" };
      }

      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // 🔑 Ensure Mongo profile (in case it was never created / was reset)
      const token = await user.getIdToken();
      await fetch(`${API_BASE}/api/auth/ensureProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: user.displayName }),
      });

      return {
        success: true,
        user: { uid: user.uid, email: user.email, displayName: user.displayName },
      };
    } catch (error: any) {
      return { success: false, error: error?.message || "Sign in failed" };
    }
  }

  // University email allowlist
  static isUniversityEmail(email: string): boolean {
    const universityDomains = [
      "university.ac.lk",
      "university.edu.lk",
      "university.lk",
      "ac.lk",
      "edu.lk",
      "mrt.ac.lk",
      "cmb.ac.lk",
      "pdn.ac.lk",
      "jfn.ac.lk",
      "rjt.ac.lk",
      "sab.ac.lk",
      "ou.ac.lk",
      "nsbm.lk",
      "iit.ac.lk",
      "sliit.lk",
      "icbt.lk",
      "apiit.lk",
      "kdu.ac.lk",
      "sltc.ac.lk",
      "sliate.ac.lk",
      "vau.ac.lk",
      "easternuni.ac.lk",
      "seu.ac.lk",
      "wayamba.ac.lk",
      "uwu.ac.lk",
      "uom.lk",
      "ucsc.cmb.ac.lk",
      "uok.ac.lk",
      "uoc.ac.lk",
      "uop.ac.lk",
    ];
    const domain = email.split("@")[1]?.toLowerCase();
    return universityDomains.includes(domain);
  }

  // Sign out
  static async signOut() {
    try {
      await fbSignOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message || "Sign out failed" };
    }
  }

  // Auth state listener
  static onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Current user
  static getCurrentUser() {
    return auth.currentUser;
  }
}
//AuthService (handles login/signup + ensures profile exists).