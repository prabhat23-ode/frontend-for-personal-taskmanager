import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-for-personaltaskmanagerap.onrender.com/api/v1",
});

// helper to set/remove default Authorization header
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try { localStorage.setItem("token", token); } catch (e) { /* ignore */ }
  } else {
    delete api.defaults.headers.common["Authorization"];
    try { localStorage.removeItem("token"); } catch (e) { /* ignore */ }
  }
}

// initialize auth header from localStorage when module loads
try {
  const storedToken = localStorage.getItem("token");
  if (storedToken) api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
} catch (e) {
  // ignore (SSR or restricted environment)
}

export default api;
