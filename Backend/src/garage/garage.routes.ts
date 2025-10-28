import { Router } from "express";
import {
  findAll,
  findOne,
  updateGarage,
  deleteGarage,
  addGarage,
} from "./garage.controler.js";

export const garageRouter = Router();

// Obtener todos los garages
garageRouter.get("/", findAll);

// Obtener un garage por ID
garageRouter.get("/:id", findOne);

//crear garage
garageRouter.post("/", addGarage);

//actualizar garage por ID
garageRouter.put("/:id", updateGarage);

//eliminar garage por ID
garageRouter.delete("/:id", deleteGarage);
