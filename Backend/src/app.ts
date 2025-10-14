import 'reflect-metadata'
import express from 'express'
import { orm, syncSchema } from './shared/orm.js'
import { RequestContext } from '@mikro-orm/core'

import { tiporeservaRouter } from './tipoReserva/tipoReserva.routes.js'
import { tipoVehiculoRouter } from './tipoVehiculo/tipoVehiculo.routes.js'
import { reservaRouter } from './reserva/reserva.routes.js'
import { vehiculoRouter } from './vehiculo/vehiculo.routes.js'
import { garageRouter } from './garage/garage.routes.js'
import { clienteRouter } from './cliente/cliente.routes.js'
import { zonaRouter } from './zona/zona.routes.js'



const app = express()

app.use(express.json())


//luego de los middlewares de express
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

//Rutas de negocio
app.use('/api/tipoReserva', tiporeservaRouter)
app.use('/api/reserva', reservaRouter)
app.use('/api/garage', garageRouter)
app.use('/api/tipoVehiculo', tipoVehiculoRouter)
app.use('/api/clientes', clienteRouter)
app.use('/api/zona', zonaRouter)
app.use('/api/vehiculo', vehiculoRouter)




//Middleware para rutas no encontradas
app.use((req, res, next) => {
  return res.status(404).json({ message: 'Error 404 resource not found :(' })
})






await syncSchema() //never call this in production, only for development

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
