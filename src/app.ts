import express from 'express'
import { clienteRoute } from './cliente/cliente.routes.js'

const app = express()
app.use(express.json())

// Usamos /api/clientes para la API de clientes
app.use('/api/clientes', clienteRoute)

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/')
})

import { test } from './cliente/cliente.routes.js'
console.log(test)
