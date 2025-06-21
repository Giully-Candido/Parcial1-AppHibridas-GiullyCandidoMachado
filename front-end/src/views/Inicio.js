import { useEffect, useState } from 'react';
import CrearExcusa from '../components/CrearExcusa';
import MenuCategorias from '../components/MenuCategorias';
import ListaExcusas from '../components/ListaExcusas';
import { getExcusas, getExcusasOrdenadas } from '../services/excusaService';

function Inicio() {
  const [excusas, setExcusas] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [error, setError] = useState('');

  useEffect(() => {
    getExcusasOrdenadas()
      .then(setExcusas)
      .catch(() => setError('No se pudieron cargar las excusas. Intenta más tarde.'));
  }, []);

  const agregarExcusa = (nuevaExcusa) => {
  console.log('Intentando agregar excusa:', nuevaExcusa);
  setExcusas(prev => [nuevaExcusa, ...prev]);
};

  const excusasFiltradas = categoriaSeleccionada === 'todas'
    ? excusas
    : excusas.filter(e => e.contexto === categoriaSeleccionada);

  return (
    <div className="container py-5">
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      <div className="row g-5">
        {/* Columna izquierda:feed */}
        <div className="col-lg-8">
          <MenuCategorias
            categoriaSeleccionada={categoriaSeleccionada}
            setCategoriaSeleccionada={setCategoriaSeleccionada}
          />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Todas las excusas</h2>
          </div>
          <ListaExcusas excusas={excusasFiltradas} />
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