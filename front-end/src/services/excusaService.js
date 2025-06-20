export async function crearExcusa(datos, token) {
  const respuesta = await fetch('/api/excusas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  return await respuesta.json();
}

export async function getExcusas() {
  const res = await fetch('/api/excusas');
  return await res.json();
}

export async function getMisExcusas(token) {
  const res = await fetch('/api/excusas/mis-excusas', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function borrarExcusa(id, token) {
  return await fetch(`/api/excusas/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function editarExcusa(id, data, token) {
  const res = await fetch(`/api/excusas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function getExcusasPorContexto(nombre) {
  const res = await fetch(`/api/excusas/contexto/${nombre}`);
  return await res.json();
}

export async function getExcusasOrdenadas() {
  const res = await fetch('/api/excusas');
  const data = await res.json();
  return (data.data || []).reverse();
}