import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth";
import theme from "../styles/theme";

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let result;
      if (isSignUp) {
        result = await AuthService.signUp(email, password, name);
      } else {
        result = await AuthService.signIn(email, password);
      }

      if (result.success && result.user) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{ background: theme.gradients.primary }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <h2
          className="text-3xl font-extrabold mb-6 text-center"
          style={{ color: theme.colors.titleColor }}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {isSignUp && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        )}

        <input
          type="email"
          placeholder="University Email (e.g., student@mrt.ac.lk)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <div
          className="text-sm mb-4"
          style={{ color: theme.colors.textSecondary }}
        >
          Only university email addresses are allowed
        </div>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        {error && (
          <div
            className="text-center mb-4 font-medium"
            style={{ color: "#E74C3C" }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-lg transition transform hover:scale-105"
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
          }}
          disabled={loading}
        >
          {loading ? (isSignUp ? "Signing Up..." : "Signing In...") : isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <div
          className="text-center mt-6"
          style={{ color: theme.colors.textPrimary }}
        >
          {isSignUp ? (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                className="underline font-medium"
                style={{ color: theme.colors.secondary }}
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="underline font-medium"
                style={{ color: theme.colors.secondary }}
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
