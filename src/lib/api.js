const API_BASE = '/api';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('unicom_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred while processing your request.');
  }

  return data;
}

export const api = {
  // Auth
  googleAuth: (payload) => apiFetch('/auth/google', { method: 'POST', body: JSON.stringify(payload) }),
  adminLogin: (credentials) => apiFetch('/auth/admin/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getMe: () => apiFetch('/auth/me'),

  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/products?${query}`);
  },
  getFilterOptions: () => apiFetch('/products/meta/filters'),
  getProduct: (idOrSlug) => apiFetch(`/products/${idOrSlug}`),

  // Orders
  submitOrder: (orderPayload) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(orderPayload) }),
  getMyOrders: () => apiFetch('/orders/my-orders'),

  // Enquiries
  submitEnquiry: (enquiryPayload) => apiFetch('/enquiries', { method: 'POST', body: JSON.stringify(enquiryPayload) }),

  // Admin
  getAdminStats: () => apiFetch('/admin/stats'),
  createProduct: (productData) => apiFetch('/admin/products', { method: 'POST', body: JSON.stringify(productData) }),
  updateProduct: (id, productData) => apiFetch(`/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(productData) }),
  toggleProductFlag: (id, field) => apiFetch(`/admin/products/${id}/toggle`, { method: 'PATCH', body: JSON.stringify({ field }) }),
  deleteProduct: (id) => apiFetch(`/admin/products/${id}`, { method: 'DELETE' }),
  getAdminOrders: () => apiFetch('/admin/orders'),
  updateOrderStatus: (id, status) => apiFetch(`/admin/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getAdminEnquiries: () => apiFetch('/admin/enquiries'),
  updateEnquiryStatus: (id, status) => apiFetch(`/admin/enquiries/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getSettings: () => apiFetch('/admin/settings'),
  updateSettings: (settings) => apiFetch('/admin/settings', { method: 'POST', body: JSON.stringify(settings) }),
};
