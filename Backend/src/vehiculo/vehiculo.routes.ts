import { Router } from "express";
import {findAll,findOne,addVehiculo,updateVehiculo,removeVehiculo} from "./vehiculo.controler";

const router = Router();

// Obtener todos los vehículos
router.get("/", findAll);

// Obtener un vehículo por ID
router.get("/:id", findOne);

// Crear un vehículo
router.post("/", addVehiculo);

// Actualizar un vehículo por ID
router.put("/:id", updateVehiculo);

// Eliminar un vehículo por ID
router.delete("/:id", removeVehiculo);

export default router;
