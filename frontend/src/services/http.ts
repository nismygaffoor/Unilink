// src/services/http.ts
import { auth } from "../firebase";

const API_BASE = "http://localhost:5000"; // adjust if hosted elsewhere

function buildHeaders(options: RequestInit, token?: string): Record<string, string> {
  const isFormData = options.body instanceof FormData;

  // normalize headers into a plain object
  const headers: Record<string, string> = {};
  if (options.headers instanceof Headers) {
    options.headers.forEach((value, key) => {
      headers[key] = value;
    });
  } else if (Array.isArray(options.headers)) {
    for (const [key, value] of options.headers) {
      headers[key] = value;
    }
  } else if (options.headers) {
    Object.assign(headers, options.headers as Record<string, string>);
  }

  if (token) headers.Authorization = `Bearer ${token}`;

  // ❌ don’t set Content-Type manually for FormData
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

// Wrapper for requests that need Firebase auth
export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const token = await user.getIdToken();
  const headers = buildHeaders(options, token);

  return fetch(`${API_BASE}${url}`, { ...options, headers });
}

// Wrapper for requests that don’t need auth
export async function plainFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = buildHeaders(options);
  return fetch(`${API_BASE}${url}`, { ...options, headers });
}

export { API_BASE };
