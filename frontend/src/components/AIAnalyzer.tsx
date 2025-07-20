import { useState } from "react";

export default function AIAnalyzer({ text }: { text: string }) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
        {
          method: "POST",
          headers: {
            "Authorization": "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", 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ inputs: text })
        }
      );
      const data = await response.json();
      if (Array.isArray(data) && data[0]?.label) {
        setResult(`${data[0].label} (${(data[0].score * 100).toFixed(1)}%)`);
      } else if (Array.isArray(data) && data[0]?.length && data[0][0]?.label) {
        setResult(`${data[0][0].label} (${(data[0][0].score * 100).toFixed(1)}%)`);
      } else {
        setResult("No result");
      }
    } catch (e) {
      setResult("Error analyzing text");
    }
    setLoading(false);
  }

  return (
    <div className="mt-2">
      <button
        onClick={analyze}
        disabled={loading}
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 transition"
      >
        {loading ? "Analyzing..." : "Analyze Sentiment"}
      </button>
      {result && <div className="mt-2 text-sm text-blue-700">AI: {result}</div>}
    </div>
  );
} 