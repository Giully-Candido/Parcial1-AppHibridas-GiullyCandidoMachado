import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registro from './components/Registro';
import Login from './components/Login';
import CrearExcusa from './components/CrearExcusa';
import RutasPrivadas from './components/RutasPrivadas';


function App() {
  return (
    <BrowserRouter>
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
        {/* otras rutas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;