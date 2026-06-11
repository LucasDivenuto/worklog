import axios from "axios";

// CRA → process.env.REACT_APP_API_URL
// Vite → import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || // CRA
    "http://localhost:8080", // fallback local
});

// --- Interceptor de requests ---
api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("appJornalesToken");
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete request.headers["Authorization"];
    }
    return request;
  },
  (error) => Promise.reject(error)
);

// --- Interceptor de responses ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("⚠️ Resource not found (404)");
      }
      if (error.response.status === 401) {
        console.warn("⚠️ Unauthorized (401) → token inválido o expirado");
        // 👉 acá podrías redirigir al login si querés:
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
