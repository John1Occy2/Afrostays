// API URL configuration
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Helper function to build API URLs
export function getApiUrl(path: string): string {
  return `${API_URL}${path}`;
}
