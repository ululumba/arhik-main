const API_BASE = 'http://localhost:4001/api/auth';

export const register = async (data) => {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Registration failed');
  }
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }
  return res.json();
};

export const getProfile = async (token) => {
  const res = await fetch(`${API_BASE}/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Unauthorized');
  }
  return res.json();
};