import { useState } from 'react';
import { registrarUsuario } from '../services/usuarioService';
import { Link, useNavigate } from 'react-router-dom';

function Registro() {
  const [formulario, setFormulario] = useState({ nombre: '', email: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success'); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    setMensaje('');
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('');

    // Validaciones frontend 
    if (!formulario.nombre.trim()) {
      setTipoMensaje('error');
      setMensaje('El nombre no puede estar vacío.');
      return;
    }
    if (!formulario.email.includes('@') || !formulario.email.includes('.')) {
      setTipoMensaje('error');
      setMensaje('El email no es válido.');
      return;
    }
    if (formulario.password.length < 6) {
      setTipoMensaje('error');
      setMensaje('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const datos = await registrarUsuario(formulario);
      if (datos.status === 'success') {
        setTipoMensaje('success');
        setMensaje(datos.message || '¡Registro exitoso! Ahora puedes iniciar sesión.');
        setFormulario({ nombre: '', email: '', password: '' });
        // Redirige al login después de 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setTipoMensaje('error');
        setMensaje(datos.message || 'Error en el registro');
      }
    } catch (error) {
      setTipoMensaje('error');
      setMensaje('Error de conexión con el servidor');
    }
    setLoading(false);
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Registro</h2>
          {/* Alerta inline */}
          {mensaje && (
            <div className={`alert ${tipoMensaje === 'error' ? 'alert-danger' : 'alert-success'} text-center`} role="alert">
              {mensaje}
            </div>
          )}
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