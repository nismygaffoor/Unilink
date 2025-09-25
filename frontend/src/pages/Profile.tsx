import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth"; // Firebase Auth only

type User = {
  name: string;
  email: string;
  notes: number;
  events: number;
  forumPosts: number;
  badge: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser; // Get logged-in Firebase user
    if (user?.email) {
      fetch(`http://localhost:5000/api/users/${user.email}`) // MongoDB backend endpoint
        .then(res => res.json())
        .then(data => setProfile(data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-2"><span className="font-semibold">Name:</span> {profile.name}</div>
      <div className="mb-2"><span className="font-semibold">Email:</span> {profile.email}</div>
      <div className="mb-2"><span className="font-semibold">Notes Uploaded:</span> {profile.notes}</div>
      <div className="mb-2"><span className="font-semibold">Events Created:</span> {profile.events}</div>
      <div className="mb-2"><span className="font-semibold">Forum Posts:</span> {profile.forumPosts}</div>
      <div className="mb-2"><span className="font-semibold">Badge:</span> {profile.badge}</div>
    </div>
  );
}
