import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const irALogin = () => {
    navigate('/login');
  };

  const irAInicio = () => {
    navigate('/inicio');
  };

  const irAMisExcusas = () => {
    navigate('/mis-excusas');
  };

  return (
    <header className="navbar navbar-expand-lg bg-light shadow-sm px-4 py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1
          className="h4 m-0"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Excusas Creativas
        </h1>
        {token ? (
          <div className="d-flex gap-2 align-items-center">
            <button onClick={irAInicio} className="btn btn-outline-primary">
              Inicio
            </button>
            <button onClick={irAMisExcusas} className="btn btn-outline-secondary">
              Mis Excusas
            </button>
            <button onClick={cerrarSesion} className="btn btn-outline-danger">
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button onClick={irALogin} className="btn btn-primary">
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;