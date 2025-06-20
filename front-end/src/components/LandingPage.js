import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContextos } from '../services/contextoService';

function LandingPage() {
  const [contextos, setContextos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  getContextos().then(data => {
    console.log('Contextos recibidos en el frontend:', data);
    setContextos(data.data || []);
  });
}, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Bienvenido a Excusas Creativas</h1>
      <p className="lead text-center mb-5">
        La red social donde puedes compartir y descubrir las excusas más originales para cualquier situación.
        Registrate o inicia sesión para participar.
      </p>
      <h2 className="mb-3">Contextos Populares</h2>
      <div className="row">
        {contextos.map(ctx => (
          <div className="col-md-4 mb-4" key={ctx._id}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{ctx.nombre.charAt(0).toUpperCase() + ctx.nombre.slice(1)}</h5>
                <p className="card-text flex-grow-1">{ctx.descripcion}</p>
                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={() => navigate(`/contexto/${ctx.nombre}`)}
                >
                  Ver más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;