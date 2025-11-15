const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

const isMockMode = !import.meta.env.VITE_BACKEND_URL;

function readLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

async function loadSeed() {
  if (isMockMode) {
    const already = readLocal('__seeded__', false);
    if (already) return;
    const res = await fetch('/db.json');
    const seed = await res.json();
    Object.entries(seed).forEach(([k, v]) => writeLocal(k, v));
    writeLocal('__seeded__', true);
  }
}

async function get(resource, params = {}) {
  if (isMockMode) {
    await loadSeed();
    const data = readLocal(resource, []);
    // very light filtering support
    if (params.filter) {
      const entries = Object.entries(params.filter);
      return data.filter((item) => entries.every(([k, v]) => item[k] === v));
    }
    return data;
  }
  const url = new URL(`${BASE_URL}/${resource}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

async function post(resource, body) {
  if (isMockMode) {
    await loadSeed();
    const data = readLocal(resource, []);
    const id = data.length ? Math.max(...data.map((d) => d.id || 0)) + 1 : 1;
    const now = { ...body, id };
    const updated = [...data, now];
    writeLocal(resource, updated);
    return now;
    }
  const res = await fetch(`${BASE_URL}/${resource}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to create');
  return res.json();
}

async function patch(resource, id, body) {
  if (isMockMode) {
    await loadSeed();
    const data = readLocal(resource, []);
    const updated = data.map((d) => (d.id === id ? { ...d, ...body } : d));
    writeLocal(resource, updated);
    return updated.find((d) => d.id === id);
  }
  const res = await fetch(`${BASE_URL}/${resource}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to update');
  return res.json();
}

async function remove(resource, id) {
  if (isMockMode) {
    await loadSeed();
    const data = readLocal(resource, []);
    const updated = data.filter((d) => d.id !== id);
    writeLocal(resource, updated);
    return { success: true };
  }
  const res = await fetch(`${BASE_URL}/${resource}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete');
  return { success: true };
}

export const api = { get, post, patch, remove };
