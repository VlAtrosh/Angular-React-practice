const BASE = 'https://jsonplaceholder.typicode.com';

export async function getPosts() {
  const res = await fetch(`${BASE}/posts?_limit=10`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getPost(id) {
  const res = await fetch(`${BASE}/posts/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${BASE}/posts/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return true;
}

export async function getPostsPage(page, limit = 5) {
  const res = await fetch(`${BASE}/posts?_page=${page}&_limit=${limit}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const posts = await res.json();
  const total = Number(res.headers.get('x-total-count') ?? 100);
  return { posts, total, totalPages: Math.ceil(total / limit) };
}
