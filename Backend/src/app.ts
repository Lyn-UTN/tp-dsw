import "dotenv/config";

import cors from "cors";
import "reflect-metadata";
import express from "express";
import { orm, syncSchema } from "./shared/orm.js";
import { RequestContext } from "@mikro-orm/core";

import { tiporeservaRouter } from "./tipoReserva/tipoReserva.routes.js";
import { tipoVehiculoRouter } from "./tipoVehiculo/tipoVehiculo.routes.js";
import { reservaRouter } from "./reserva/reserva.routes.js";
import { vehiculoRouter } from "./vehiculo/vehiculo.routes.js";
import { garageRouter } from "./garage/garage.routes.js";
import { clienteRouter } from "./cliente/cliente.routes.js";
import { zonaRouter } from "./zona/zona.routes.js";

import { seedTipoReserva } from "./tipoReserva/tipoReserva.seed.js";
import { seedZonas } from "./zona/zona-seed.js";
import { seedGarages } from "./garage/garage.seed.js";
import authRouter from "./auth-login/auth.routes.js";

const app = express();

app.use(cors());

//middleware para leer paquetes json
app.use(express.json());

//esto es para que cada request tenga su propio EntityManager
app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

//Rutas de negocio
app.use("/api/tipoReserva", tiporeservaRouter);
app.use("/api/reserva", reservaRouter);
app.use("/api/garage", garageRouter);
app.use("/api/tipoVehiculo", tipoVehiculoRouter);
app.use("/api/clientes", clienteRouter);
app.use("/api/zona", zonaRouter);
app.use("/api/vehiculo", vehiculoRouter);

app.use("/auth", authRouter);
//RTA 404 - NOT FOUND
app.use((_, res) => {
  //ignora la peticion por eso el _
  return res.status(404).json({ message: "Error 404 resource not found :(" });
});

await syncSchema(); //solo usar en desarrollo

//seeders
await seedTipoReserva();
await seedZonas();
await seedGarages();

app.listen(3000, () => {
  console.log("Corriendo en http://localhost:3000");
});
