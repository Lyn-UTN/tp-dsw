import {Router} from "express"; 
import {findAll, findOne, updateGarage, deleteGarage, addGarage} from "./garage.controler";

const router = Router();

// Obtener todos los garages
router.get("/", findAll);

// Obtener un garage por ID
router.get("/:id", findOne); 

//crear garage
router.post("/", addGarage);

//actualizar garage por ID
router.put("/:id", updateGarage);

//eliminar garage por ID
router.delete("/:id", deleteGarage);

export const garageRouter = router;