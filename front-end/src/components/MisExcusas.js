import { useEffect, useState, useRef } from 'react';
import { getMisExcusas, borrarExcusa, editarExcusa } from '../services/excusaService';

function MisExcusas() {
  const [excusas, setExcusas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [formEdit, setFormEdit] = useState({ texto: '', credibilidad: '', contexto: '' });
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [excusaABorrar, setExcusaABorrar] = useState(null);
  const token = localStorage.getItem('token');
  const toastTimeout = useRef();

  useEffect(() => {
    getMisExcusas(token)
      .then(data => setExcusas(data.data || []));
  }, [token]);

  // Mostrar toast cuando cambia el mensaje
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

  // Abrir modal de confirmación
  const pedirConfirmacionBorrado = (excusa) => {
    setExcusaABorrar(excusa);
    setShowModal(true);
  };

  // Confirmar borrado desde el modal
  const confirmarBorrado = async () => {
    setShowModal(false);
    if (!excusaABorrar) return;
    setLoading(true);
    try {
      const res = await borrarExcusa(excusaABorrar._id, token);
      if (res.ok) {
        setExcusas(excusas.filter(e => e._id !== excusaABorrar._id));
        setMensaje('Excusa eliminada');
      } else {
        setMensaje('Error: Error al borrar la excusa');
      }
    } catch (error) {
      setMensaje('Error: Error de conexión con el servidor');
    }
    setLoading(false);
    setExcusaABorrar(null);
  };

  const empezarEdicion = (excusa) => {
    setEditandoId(excusa._id);
    setFormEdit({ texto: excusa.texto, credibilidad: excusa.credibilidad, contexto: excusa.contexto });
  };

  const manejarCambio = (e) => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const guardarEdicion = async (id) => {
    // Validaciones antes de editar
    if (!formEdit.texto.trim()) {
      setMensaje('Error: La excusa no puede estar vacía.');
      return;
    }
    if (formEdit.texto.length < 5) {
      setMensaje('Error: La excusa debe tener al menos 5 caracteres.');
      return;
    }

    // Verifica si hubo cambios
    const original = excusas.find(e => e._id === id);
    if (
      formEdit.texto === original.texto &&
      formEdit.credibilidad === original.credibilidad &&
      formEdit.contexto === original.contexto
    ) {
      setMensaje('Error: No realizaste ningún cambio en la excusa.');
      return;
    }

    setLoading(true);
    try {
      const actualizada = await editarExcusa(id, formEdit, token);
      if (actualizada && !actualizada.error) {
        setExcusas(excusas.map(e => e._id === id ? { ...e, ...formEdit } : e));
        setEditandoId(null);
        setMensaje('Excusa editada');
      } else {
        setMensaje('Error: ' + (actualizada?.message || 'Error al editar la excusa'));
      }
    } catch (error) {
      setMensaje('Error: Error de conexión con el servidor');
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <h2>Mis Excusas</h2>

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

      {/* Modal Bootstrap para confirmar borrado */}
      {showModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar borrado</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>¿Seguro que deseas borrar esta excusa?</p>
                  <p><strong>{excusaABorrar?.texto}</strong></p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                  <button type="button" className="btn btn-danger" onClick={confirmarBorrado} disabled={loading}>
                    {loading ? 'Borrando...' : 'Borrar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      <ul className="list-group">
        {excusas.map(excusa => (
          <li key={excusa._id} className="list-group-item d-flex justify-content-between align-items-center">
            {editandoId === excusa._id ? (
              <form className="w-100 d-flex flex-column flex-md-row gap-2 align-items-center"
                onSubmit={e => { e.preventDefault(); guardarEdicion(excusa._id); }}>
                <input
                  type="text"
                  name="texto"
                  value={formEdit.texto}
                  onChange={manejarCambio}
                  className="form-control"
                  disabled={loading}
                />
                <select name="credibilidad" value={formEdit.credibilidad} onChange={manejarCambio} className="form-select" required disabled={loading}>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
                <select name="contexto" value={formEdit.contexto} onChange={manejarCambio} className="form-select" required disabled={loading}>
                  <option value="trabajo">Trabajo</option>
                  <option value="universidad">Universidad</option>
                  <option value="familia">Familia</option>
                  <option value="amigos">Amigos</option>
                  <option value="pareja">Pareja</option>
                </select>
                <button type="submit" className="btn btn-success btn-sm" disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar'}
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditandoId(null)} disabled={loading}>
                  Cancelar
                </button>
              </form>
            ) : (
              <>
                <span>
                  <strong>{excusa.texto}</strong>
                  <br />
                  <span className="badge bg-secondary me-2">Credibilidad: {excusa.credibilidad}</span>
                  <span className="badge bg-info text-dark">Contexto: {excusa.contexto}</span>
                </span>
                <span>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => empezarEdicion(excusa)} disabled={loading}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => pedirConfirmacionBorrado(excusa)} disabled={loading}>Borrar</button>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MisExcusas;