import express from 'express';

const app = express();
const PORT = 3000;

app.use('/', (req, res) => {
  res.send('<h1>API funcionando correctamente<h1>');//<h1> es un encabezado HTML que muestra la letra en negrita
});//res.json es otra forma de ver 

// aca uso PORT como puerto para el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});