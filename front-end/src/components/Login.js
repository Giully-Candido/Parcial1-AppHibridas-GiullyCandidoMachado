import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../services/usuarioService';

function Login() {
  const [formulario, setFormulario] = useState({ email: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const datos = await loginUsuario(formulario);
      if (datos.token) {
        setMensaje('¡Login exitoso! Redirigiendo...');
        localStorage.setItem('token', datos.token);
        setTimeout(() => {
          navigate('/crear-excusa'); // Cambia la ruta a donde quieras redirigir
        }, 1500); // Espera 1.5 segundos antes de redirigir
      } else {
        setMensaje(datos.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      setMensaje('Error de conexión con el servidor');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={manejarEnvio}>
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
        <button type="submit">Ingresar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Login;