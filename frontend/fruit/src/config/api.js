// api.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const PRODUCT_API = `${API_BASE}/api/products`;
export const ORDER_API = `${API_BASE}/api/orders`;
