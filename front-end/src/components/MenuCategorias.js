import { useEffect, useState } from 'react';
import { getContextos } from '../services/contextoService';

function MenuCategorias({ categoriaSeleccionada, setCategoriaSeleccionada }) {
  const [categorias, setCategorias] = useState(['todas']);

  useEffect(() => {
    getContextos()
      .then(data => {
        // Si data.data es un array de strings:
        const contextos = Array.isArray(data.data) ? data.data : [];
        setCategorias(['todas', ...contextos.map(ctx => typeof ctx === 'string' ? ctx : ctx.nombre)]);
      })
      .catch(() => setCategorias(['todas']));
  }, []);

  return (
    <div className="mb-4">
      <div className="btn-group" role="group" aria-label="Filtrar por categoría">
        {categorias.map(cat => (
          <button
            key={cat}
            type="button"
            className={`btn btn${categoriaSeleccionada === cat ? '' : '-outline'}-primary`}
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MenuCategorias;