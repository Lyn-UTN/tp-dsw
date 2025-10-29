import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import GararageReserva from './pages/GarageReserva.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/registrarse" element={<Register />} />
      <Route path="/garagereserva" element={<GararageReserva />} />
    </Routes>
  );
}

export default App;

/*import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import Home from "./pages/Home";
//importar paginas

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
*/
