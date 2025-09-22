import { useEffect, useState } from "react";
import AIAnalyzer from '../components/AIAnalyzer';
import TagSuggester from '../components/TagSuggester';

type ForumPost = {
  id: string;
  author: string;
  date: string;
  content: string;
  replies: number;
};

export default function CommunityForum() {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [editing, setEditing] = useState<ForumPost | null>(null);
  const [form, setForm] = useState({ author: "", content: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadForumPosts();
  }, []);

  async function loadForumPosts() {
    try {
      const res = await fetch("http://localhost:5000/api/forum"); // replace with your backend endpoint
      const data = await res.json();
      setForumPosts(data || []);
    } catch (error) {
      console.error("Error loading forum posts:", error);
    }
  }

  function handleEdit(post: ForumPost) {
    setEditing(post);
    setForm(post);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);
    try {
      await fetch(`http://localhost:5000/api/forum/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      await loadForumPosts();
      setEditing(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this post?")) return;
    try {
      await fetch(`http://localhost:5000/api/forum/${id}`, { method: "DELETE" });
      await loadForumPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Community Forum</h1>
      {editing && (
        <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-2 max-w-xl">
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Your Email"
            className="border p-2 rounded"
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Your Question or Message"
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 transition" disabled={loading}>
            {loading ? "Updating..." : "Update Post"}
          </button>
          <button type="button" onClick={() => setEditing(null)} className="text-red-500 mt-2">Cancel</button>
        </form>
      )}
      <ul className="space-y-4">
        {forumPosts.map(post => (
          <li key={post.id} className="border rounded-lg p-4 shadow hover:shadow-xl transition bg-white">
            <div className="text-gray-700 mb-2">{post.content}</div>
            <div className="text-sm text-gray-500">
              Posted by: {post.author} | Date: {post.date} | Replies: {post.replies}
            </div>
            <AIAnalyzer text={post.content} />
            <TagSuggester text={post.content} />
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(post)} className="text-yellow-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
