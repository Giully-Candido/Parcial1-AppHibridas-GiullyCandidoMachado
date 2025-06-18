export async function crearExcusa(datos, token) {
  const respuesta = await fetch('http://localhost:3000/api/excusas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  return await respuesta.json();
}