export async function registrarUsuario(datos) {
  const respuesta = await fetch('http://localhost:3000/api/usuarios/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return await respuesta.json();
}

export async function loginUsuario(datos) {
  const respuesta = await fetch('http://localhost:3000/api/usuarios/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return await respuesta.json();
}