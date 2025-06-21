import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExcusasPorContexto } from '../services/excusaService';

function ExcusasPorContexto() {
  const { nombre } = useParams();
  const [excusas, setExcusas] = useState([]);

  useEffect(() => {
    getExcusasPorContexto(nombre).then(data => setExcusas(data.data || []));
  }, [nombre]);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Excusas para: {nombre.charAt(0).toUpperCase() + nombre.slice(1)}</h2>
      {excusas.length === 0 ? (
        <div className="alert alert-info">No hay excusas para este contexto aún.</div>
      ) : (
        <ul className="list-group">
          {excusas.map(excusa => (
            <li key={excusa._id} className="list-group-item">
              <strong>{excusa.texto}</strong>
              <br />
              <span className="badge bg-secondary me-2">Credibilidad: {excusa.credibilidad}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExcusasPorContexto;