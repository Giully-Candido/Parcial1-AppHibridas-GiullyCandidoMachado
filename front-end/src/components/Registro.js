import { useState, useRef, useEffect } from 'react';
import { registrarUsuario } from '../services/usuarioService';
import { Link } from 'react-router-dom';

function Registro() {
  const [formulario, setFormulario] = useState({ nombre: '', email: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeout = useRef();

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('');

    // Validaciones frontend 
    if (!formulario.nombre.trim()) {
      setMensaje('Error: El nombre no puede estar vacío.');
      return;
    }
    if (!formulario.email.includes('@') || !formulario.email.includes('.')) {
      setMensaje('Error: El email no es válido.');
      return;
    }
    if (formulario.password.length < 6) {
      setMensaje('Error: La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const datos = await registrarUsuario(formulario);
      if (!datos.message) {
        setMensaje('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setFormulario({ nombre: '', email: '', password: '' });
      } else {
        setMensaje('Error: ' + (datos.message || 'Error en el registro'));
      }
    } catch (error) {
      setMensaje('Error: Error de conexión con el servidor');
    }
    setLoading(false);
  };

  // Toast Bootstrap para mensajes
  useEffect(() => {
    if (mensaje) {
      setToastVisible(true);
      clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => {
        setToastVisible(false);
        setMensaje('');
      }, 4000);
    }
    return () => clearTimeout(toastTimeout.current);
  }, [mensaje]);

  return (
    <div className="container py-5 d-flex justify-content-center">
      {/* Toast Bootstrap */}
      <div
        className={`toast align-items-center text-white border-0 position-fixed top-0 end-0 m-4 ${toastVisible ? 'show' : ''}`}
        style={{
          zIndex: 9999,
          minWidth: 250,
          backgroundColor: mensaje.toLowerCase().includes('error') ? '#dc3545' : '#198754'
        }}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            {mensaje}
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={() => { setToastVisible(false); setMensaje(''); }}
          ></button>
        </div>
      </div>

      <div className="card shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Registro</h2>
          <form onSubmit={manejarEnvio} className="d-flex flex-column gap-3">

            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                placeholder="Tu nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="ejemplo@correo.com"
                value={formulario.email}
                onChange={manejarCambio}
                disabled={loading}
              />
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="********"
                value={formulario.password}
                onChange={manejarCambio}
                disabled={loading}
              />
              <div className="form-text">Mínimo 6 caracteres</div>
            </div>

            {/* Botón */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>

            {/* Link a login */}
            <div className="mt-2 text-center">
              ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registro;