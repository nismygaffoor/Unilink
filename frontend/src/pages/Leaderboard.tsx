import { useEffect, useState } from "react";
import { UserService } from "../services/user";

export default function Leaderboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await UserService.getLeaderboard();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <ul>
        {users.map((u, i) => (
          <li key={u._id} className="mb-2">
            <span className="font-bold">#{i + 1}</span> {u.name} — {u.points} pts
          </li>
        ))}
      </ul>
    </div>
  );
}
