import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { UserService } from "../services/user";

// Optional: central place for available badges
const BADGES = [
  "🎓 Newcomer",
  "⭐ Rising Star",
  "🏅 Contributor",
  "🚀 Champ",
  "👑 Legend",
];

type ProfileDoc = {
  _id: string;         // Firebase UID
  name: string;
  email: string;
  points: number;
  badge: string;
  notes: number;
  events: number;
  forumPosts: number;
  createdAt?: string;
  updatedAt?: string;
};

export default function Profile() {
  const [me, setMe] = useState<ProfileDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", badge: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await UserService.getMe();
        setMe(data);
        setForm({ name: data.name || "", badge: data.badge || "🎓 Newcomer" });
      } catch (e: any) {
        setErr(e?.message || "Please sign in to view your profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!me) return;
    setSaving(true);
    setErr(null);
    setMsg(null);
    try {
      // 1) Update Mongo profile
      const updated = await UserService.updateMe({
        name: form.name,
        badge: form.badge,
      });
      setMe(updated);

      // 2) Also sync Firebase displayName (nice to keep consistent)
      if (auth.currentUser && auth.currentUser.displayName !== form.name) {
        await updateProfile(auth.currentUser, { displayName: form.name });
      }

      setMsg("Profile updated!");
      setEdit(false);
    } catch (e: any) {
      setErr(e?.message || "Update failed");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 2500);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse h-6 w-48 bg-gray-200 rounded mb-4" />
        <div className="animate-pulse h-4 w-80 bg-gray-200 rounded mb-2" />
        <div className="animate-pulse h-4 w-72 bg-gray-200 rounded mb-2" />
      </div>
    );
  }
  if (!me) return <div className="p-6 text-red-600">No profile found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Your Profile</h1>
        <p className="text-gray-500">Manage your public info and badge.</p>
      </div>

      {/* Alerts */}
      {msg && (
        <div className="mb-4 rounded-lg bg-green-50 text-green-700 p-3 text-sm">
          {msg}
        </div>
      )}
      {err && (
        <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">
          {err}
        </div>
      )}

      <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-sm p-5">
        {!edit ? (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" value={me.name} />
              <Field label="Email" value={me.email} />
              <Field label="Badge" value={me.badge} />
              <Field label="Points" value={String(me.points)} />
              <Field label="Notes" value={String(me.notes)} />
              <Field label="Events" value={String(me.events)} />
              <Field label="Forum Posts" value={String(me.forumPosts)} />
            </div>

            <div className="mt-5 flex justify-end">
              <button
                className="px-4 py-2 rounded-lg font-semibold text-white bg-gray-900 hover:bg-gray-800"
                onClick={() => setEdit(true)}
              >
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={onSave} className="grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-gray-600">Name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="mt-1 w-full border rounded-lg p-3"
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-600">Badge</span>
                <select
                  name="badge"
                  value={form.badge}
                  onChange={onChange}
                  className="mt-1 w-full border rounded-lg p-3"
                >
                  {BADGES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setForm({ name: me.name, badge: me.badge });
                  setEdit(false);
                }}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-medium text-gray-800">{value || "—"}</div>
    </div>
  );
}
