import { useState } from "react";

const candidateLabels = ["Exam", "Kuppi", "Event", "Help", "Notes", "Career", "General"];

export default function TagSuggester({ text }: { text: string }) {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function suggestTags() {
    setLoading(true);
    setTags([]);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
        {
          method: "POST",
          headers: {
            "Authorization": "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 ", // <-- Replace with your Hugging Face API key
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: text,
            parameters: { candidate_labels: candidateLabels.join(", ") }
          })
        }
      );
      const data = await response.json();
      if (data && data.labels && data.scores) {
        // Show top 2 tags with score > 0.3
        const suggested = data.labels.filter((_: string, i: number) => data.scores[i] > 0.3).slice(0, 2);
        setTags(suggested);
      } else {
        setTags([]);
      }
    } catch (e) {
      setTags([]);
    }
    setLoading(false);
  }

  return (
    <div className="mt-2">
      <button
        onClick={suggestTags}
        disabled={loading}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition"
      >
        {loading ? "Suggesting..." : "Suggest Tags"}
      </button>
      {tags.length > 0 && (
        <div className="mt-2 text-sm text-green-700">
          Suggested tags: {tags.join(", ")}
        </div>
      )}
    </div>
  );
} 