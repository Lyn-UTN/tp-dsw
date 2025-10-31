import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import GararageReserva from './pages/GarageReserva.tsx';
import NotFound from './pages/NotFound.tsx';
import MisReservas from './pages/MisReservas.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/registrarse" element={<Register />} />
      <Route path="/garagereserva/:id" element={<GararageReserva />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/misreservas" element={<MisReservas />} />
    </Routes>
  );
}

export default App;
