import { useState, useEffect } from 'react';
import { crearExcusa } from '../services/excusaService';
import { getContextos } from '../services/contextoService'; 

const opcionesCredibilidad = ['baja', 'media', 'alta'];

function CrearExcusa({ onExcusaCreada }) {
  const [formulario, setFormulario] = useState({
    texto: '',
    credibilidad: 'media',
    contexto: '',
  });
  const [opcionesContexto, setOpcionesContexto] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success'); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Traer contextos del backend 
    getContextos()
      .then(data => {
        //console.log('Contextos recibidos:', data);
        setOpcionesContexto(Array.isArray(data.data) ? data.data : []);
        setFormulario(f => ({
          ...f,
          contexto: (Array.isArray(data.data) && data.data[0]?.nombre) ? data.data[0].nombre : ''
        }));
      })
      .catch(() => setOpcionesContexto([]));
  }, []);

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    setMensaje('');
    setTipoMensaje('success');
    
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('');

    // Validaciones frontend 
    if (!formulario.texto.trim()) {
      setTipoMensaje('error');
      setMensaje('La excusa no puede estar vacía.');
      return;
    }
    if (formulario.texto.length < 5) {
      setTipoMensaje('error');
      setMensaje('La excusa debe tener al menos 5 caracteres.');
      return;
    }
    if (formulario.texto.length > 200) {
      setTipoMensaje('error');
      setMensaje('La excusa no puede tener más de 200 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const datos = await crearExcusa(formulario, token);
      if (datos.data) {
        setTipoMensaje('success');
        setMensaje('¡Excusa creada exitosamente!');
        setFormulario({ texto: '', credibilidad: 'media', contexto: opcionesContexto[0] || '' });
        if (onExcusaCreada) onExcusaCreada(datos.data);
        setTimeout(() => setMensaje(''), 3000);
      } else if (datos.message) {
        setTipoMensaje('error');
        setMensaje(datos.message);
      } else {
        setTipoMensaje('error');
        setMensaje('Error al crear la excusa. Intenta nuevamente.');
      }
    } catch (error) {
      setTipoMensaje('error');
      setMensaje('Error de conexión con el servidor');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="mb-4 text-center">Crear Excusa</h2>
      <form onSubmit={manejarEnvio} className="d-flex flex-column gap-3">
        {/* Texto */}
        <div>
          <label htmlFor="texto" className="form-label">Excusa</label>
          <textarea
            id="texto"
            name="texto"
            className="form-control"
            placeholder="Escribí tu excusa"
            rows="3"
            maxLength={200}
            value={formulario.texto}
            onChange={manejarCambio}
          />
          <div className="form-text text-end">
            {formulario.texto.length}/200 caracteres
          </div>
        </div>

        {/* Credibilidad */}
        <div>
          <label htmlFor="credibilidad" className="form-label">Credibilidad</label>
          <select
            id="credibilidad"
            name="credibilidad"
            className="form-select"
            value={formulario.credibilidad}
            onChange={manejarCambio}
            required
          >
            {opcionesCredibilidad.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Contexto */}
        <div>
          <label htmlFor="contexto" className="form-label">Contexto</label>
        <select
          id="contexto"
          name="contexto"
          className="form-select"
          value={formulario.contexto}
          onChange={manejarCambio}
          required
        >
          {opcionesContexto.length === 0 ? (
            <option value="">No hay contextos disponibles</option>
          ) : (
            opcionesContexto.map((opcion) =>
              typeof opcion === 'string' ? (
                <option key={opcion} value={opcion}>
                  {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
                </option>
              ) : (
                <option key={opcion._id || opcion.nombre} value={opcion.nombre}>
                  {opcion.nombre.charAt(0).toUpperCase() + opcion.nombre.slice(1)}
                </option>
              )
            )
          )}
        </select>
        </div>

        {/* Botón */}
        <div className="d-grid">
          <button type="submit" className="btn btn-success" disabled={loading || opcionesContexto.length === 0}>
            {loading ? 'Enviando...' : 'Agregar Excusa'}
          </button>
        </div>

        {/* Mensaje */}
        {mensaje && (
          <div
            className={`alert ${tipoMensaje === 'success' ? 'alert-success' : 'alert-danger'} text-center`}
            role="alert"
            aria-live="polite"
          >
            {mensaje}
          </div>
        )}
      </form>
    </div>
  );
}

export default CrearExcusa;