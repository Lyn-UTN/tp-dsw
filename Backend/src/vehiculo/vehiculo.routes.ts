import { Router } from "express";
import {
  findAll,
  findOne,
  addVehiculo,
  updateVehiculo,
  removeVehiculo,
  sanitizeVehiculoInput,
} from "./vehiculo.controler.js";

export const vehiculoRouter = Router();

vehiculoRouter.get("/", findAll);
vehiculoRouter.get("/:id", findOne);
vehiculoRouter.post("/", sanitizeVehiculoInput, addVehiculo);
vehiculoRouter.put("/:id", sanitizeVehiculoInput, updateVehiculo);
vehiculoRouter.delete("/:id", sanitizeVehiculoInput, removeVehiculo);
vehiculoRouter.patch("/:id", sanitizeVehiculoInput, updateVehiculo);
