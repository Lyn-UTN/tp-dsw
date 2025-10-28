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
// Obtener todos los vehículos
vehiculoRouter.get("/", findAll);

// Obtener un vehículo por ID
vehiculoRouter.get("/:id", findOne);

// Crear un vehículo
vehiculoRouter.post("/", sanitizeVehiculoInput, addVehiculo);

// Actualizar un vehículo por ID
vehiculoRouter.put("/:id", sanitizeVehiculoInput, updateVehiculo);

// Eliminar un vehículo por ID
vehiculoRouter.delete("/:id", sanitizeVehiculoInput, removeVehiculo);

//actualizar vehiculo parcialmente
vehiculoRouter.patch("/:id", sanitizeVehiculoInput, updateVehiculo);
