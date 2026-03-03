// Centralized API configuration
// In development: uses localhost:3000
// In production (HF Space etc.): uses same origin
const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? 'http://localhost:3000/api' : `${window.location.origin}/api`);

export default API_BASE_URL;
