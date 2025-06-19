import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
          navigate('/inicio'); 
        }, 1500);
      } else {
        setMensaje(datos.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      setMensaje('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Ingresá tu email"
              value={formulario.email}
              onChange={manejarCambio}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Ingresá tu contraseña"
              value={formulario.password}
              onChange={manejarCambio}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
        {mensaje && <p className="mt-3 text-center text-danger">{mensaje}</p>}
        <div className="mt-3 text-center">
          <span>¿No tenés cuenta? </span>
          <Link to="/registro">Crear una cuenta</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;