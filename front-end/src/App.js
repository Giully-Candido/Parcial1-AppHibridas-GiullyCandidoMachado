import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registro from './views/Registro';
import Login from './views/Login';
import CrearExcusa from './components/CrearExcusa';
import RutasPrivadas from './components/RutasPrivadas';
import Header from './components/Header';
import Inicio from './views/Inicio';
import MisExcusas from './views/MisExcusas';
import LandingPage from './views/InicioPublica';
import ExcusasPorContexto from './views/ExcusasPorContexto';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contexto/:nombre" element={<ExcusasPorContexto />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/crear-excusa"
          element={
            <RutasPrivadas>
              <CrearExcusa />
            </RutasPrivadas>
          }
        />
        <Route
          path="/inicio"
          element={
            <RutasPrivadas>
              <Inicio />
            </RutasPrivadas>
          }
        />
        <Route
          path="/mis-excusas"
          element={
            <RutasPrivadas>
              <MisExcusas />
            </RutasPrivadas>
          }
        />
        {/* otras rutas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;