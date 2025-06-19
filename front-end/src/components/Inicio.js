import { useEffect, useState } from 'react';
import CrearExcusa from './CrearExcusa';
import { getExcusas } from '../services/excusaService';

function Inicio() {
  const [excusas, setExcusas] = useState([]);

    useEffect(() => {
        getExcusas()
        .then(data => {
            const ordenadas = (data.data || []).sort((a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id));
            setExcusas(ordenadas.reverse());
        });
    }, []);

  // Función para agregar una excusa nueva al principio
  const agregarExcusa = (nuevaExcusa) => {
    setExcusas(prev => [nuevaExcusa, ...prev]);
  };

  return (
<div className="container py-5">
  <div className="row g-5">
    
    {/* Columna izquierda: Lista de excusas en una sola columna, tipo feed */}
    <div className="col-lg-8">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Todas las excusas</h2>
      </div>

      <div
        className="overflow-auto d-flex flex-column gap-4"
        style={{ maxHeight: '70vh', minHeight: '300px' }}
      >
        {excusas.map((excusa) => (
          <div className="card shadow-sm w-100" key={excusa._id}>
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">{excusa.texto}</h5>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <span className="badge bg-secondary px-3 py-2">
                  <strong>Credibilidad:</strong> {excusa.credibilidad}
                </span>
                <span className="badge bg-info text-dark px-3 py-2">
                  <strong>Contexto:</strong> {excusa.contexto}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Columna derecha: Crear excusa */}
    <div className="col-lg-4">
      <div className="card shadow">
        <div className="card-body">
          <CrearExcusa onExcusaCreada={agregarExcusa} />
        </div>
      </div>
    </div>

  </div>
</div>

  );
}

export default Inicio;