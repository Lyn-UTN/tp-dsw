import express from 'express';
import cliente from './cliente/cliente.routes';
const app = express();
const PORT = 3000;

app.use('/api/clientes', cliente.routes);

// aca uso PORT como puerto para el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});