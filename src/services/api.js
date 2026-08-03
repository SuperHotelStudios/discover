import { API_URL } from "../config/api";

export async function api(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let error = {};

    try {
      error = await response.json();
    } catch {
      error = {};
    }

    const err = new Error(
      error.message || "Something went wrong."
    );

    err.status = response.status;

    throw err;
  }

  return response.json();
}