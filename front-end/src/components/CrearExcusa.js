import { useState } from 'react';
import { crearExcusa } from '../services/excusaService';

const opcionesCredibilidad = ['baja', 'media', 'alta'];
const opcionesContexto = ['trabajo', 'universidad', 'familia', 'amigos', 'pareja'];

function CrearExcusa() {
  const [formulario, setFormulario] = useState({
    texto: '',
    credibilidad: 'media',
    contexto: 'trabajo',
  });
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const token = localStorage.getItem('token');
      const datos = await crearExcusa(formulario, token);
      console.log(datos); 
      if (!datos.message) {
        setMensaje('¡Excusa creada exitosamente!');
        setFormulario({ texto: '', credibilidad: 'media', contexto: 'trabajo' });
      } else {
        setMensaje(datos.message || 'Error al crear la excusa');
      }
    } catch (error) {
      setMensaje('Error de conexión con el servidor');
    }
  };

  return (
    <div>
      <h2>Crear Excusa</h2>
      <form onSubmit={manejarEnvio}>
        <textarea
          name="texto"
          placeholder="Escribe tu excusa"
          value={formulario.texto}
          onChange={manejarCambio}
          required
        />
        <div>
          <label>Credibilidad:&nbsp;
            <select
              name="credibilidad"
              value={formulario.credibilidad}
              onChange={manejarCambio}
              required
            >
              {opcionesCredibilidad.map((opcion) => (
                <option key={opcion} value={opcion}>{opcion.charAt(0).toUpperCase() + opcion.slice(1)}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>Contexto:&nbsp;
            <select
              name="contexto"
              value={formulario.contexto}
              onChange={manejarCambio}
              required
            >
              {opcionesContexto.map((opcion) => (
                <option key={opcion} value={opcion}>{opcion.charAt(0).toUpperCase() + opcion.slice(1)}</option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Agregar Excusa</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default CrearExcusa;