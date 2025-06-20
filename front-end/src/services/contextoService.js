export async function getContextos() {
  const res = await fetch('/api/contextos');
  return await res.json();
}

