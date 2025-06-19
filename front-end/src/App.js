import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registro from './components/Registro';
import Login from './components/Login';
import CrearExcusa from './components/CrearExcusa';
import RutasPrivadas from './components/RutasPrivadas';
import Header from './components/Header';
import Inicio from './components/Inicio';
import MisExcusas from './components/MisExcusas';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
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