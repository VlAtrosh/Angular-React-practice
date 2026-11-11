// Вся работа с API в одном месте. Компоненты не знают URL и структуру.
const BASE = 'https://jsonplaceholder.typicode.com';

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export function getUsers(signal) {
  return apiFetch('/users', { signal });
}

export function getUserById(id, signal) {
  return apiFetch(`/users/${id}`, { signal });
}
