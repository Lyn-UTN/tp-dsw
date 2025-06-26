import express, { NextFunction, Request, Response} from 'express';
import { TipoVehiculo } from './tipoVehiculo/tipoV_entidad.js';  


const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para pasar el cuerpo de la solicitud como JSON


//metodos de HTTP: (datos=recursos)
// GET: Obtener datos
// POST: Crear datos
// PUT and PATCH: Actualizar/modificar datos
// DELETE: Eliminar datos

app.use('/', (req, res) => {
  res.send('<h1>API funcionando correctamente<h1>');//<h1> es un encabezado HTML que muestra la letra en negrita
});//res.json es otra forma de ver 

// aca uso PORT como puerto para el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});