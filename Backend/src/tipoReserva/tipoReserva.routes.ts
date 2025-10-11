import { Router } from "express";
import { sanitizeTipoReservaInput, findAll, findOne, add, update, remove} from "./tipoReserva.controler.js";


export const tiporeservaRouter = Router() 

tiporeservaRouter.get('/', findAll) 
tiporeservaRouter.get('/:id', findOne) 
tiporeservaRouter.post('/',sanitizeTipoReservaInput, add)
tiporeservaRouter.put('/:id',sanitizeTipoReservaInput, update)
tiporeservaRouter.patch('/:id',sanitizeTipoReservaInput, update)
tiporeservaRouter.delete('/:id', remove)