import { useState } from 'react';
import { registrarUsuario } from '../services/usuarioService';

function Registro() {
  const [formulario, setFormulario] = useState({ nombre: '', email: '', password: '' });
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };


const manejarEnvio = async (e) => {
  e.preventDefault();
  setMensaje('');
  try {
    const datos = await registrarUsuario(formulario);
    if (!datos.message) {
      setMensaje('¡Registro exitoso! Ahora puedes iniciar sesión.');
      setFormulario({ nombre: '', email: '', password: '' });
    } else {
      setMensaje(datos.message || 'Error en el registro');
    }
  } catch (error) {
    setMensaje('Error de conexión con el servidor');
  }
};
  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formulario.email}
          onChange={manejarCambio}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formulario.password}
          onChange={manejarCambio}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Registro;