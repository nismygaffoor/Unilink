import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  points: number;
  badge: string;
};

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await fetch("http://localhost:5000/api/users"); // Your backend endpoint
      const data = await res.json();
      setUsers(data || []);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Points</th>
            <th className="py-2 px-4 text-left">Badge</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id} className={i === 0 ? "bg-yellow-50" : ""}>
              <td className="py-2 px-4 font-semibold">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.points}</td>
              <td className="py-2 px-4">{user.badge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
