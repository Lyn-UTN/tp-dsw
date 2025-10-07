import { Request, Response, NextFunction } from "express";
import {orm} from '../shared/orm.js';
import { Vehiculo } from "./vehiculo_entity.js";

const em = orm.em

export function sanitizeVehiculoInput(req: Request, res: Response, next: NextFunction) {
  const { marca, patente, clienteId, tipoVehiculoId } = req.body;

  const sanitizedInput: any = {
    marca: marca?.trim(),
    patente: patente?.trim().toUpperCase(),
    clienteId: Number(clienteId),
    tipoVehiculoId: Number(tipoVehiculoId),
  };

  // Eliminar undefined o valores vacíos
  Object.keys(sanitizedInput).forEach((key) => {
    if (sanitizedInput[key] === undefined || sanitizedInput[key] === "" || isNaN(sanitizedInput[key])) {
      delete sanitizedInput[key];
    }
  });

  req.body.sanitizedInput = sanitizedInput;
  next();
}



export async function findAll(req: Request, res: Response){
    try{
    const vehiculos = await em.find(Vehiculo,{});
    res.json({data: vehiculos})
    }catch(error:any){
      res.status(500).json({message: error.message})
    }
}

//Get vehiculo por id
export async function findOne(req: Request,res: Response){

  try{
    const vehiculo = await em.findOne(Vehiculo, {idVehiculo: Number(req.params.id)});
    if(!vehiculo) return res.status(404).json({message: 'Vehiculo no encontrado'})
   } catch(error:any){
    res.status(500).json({message: error.message})
  
}

}

export async function addVehiculo(req: Request, res:Response){

  try{
    const vehiculo = em.create(Vehiculo, req.body.sanitizeVehiculoInput )
    await em.flush()
    res.status(201).json({message: 'Vehiculo creado', data: vehiculo})

  }catch(error:any){
    res.status(500).json({message: error.message})
  }

}

export async function updateVehiculo(req: Request, res: Response){
  try{
    const vehiculoToUpdate = await em.findOne(Vehiculo, {idVehiculo: Number(req.params.id)});
    if(!vehiculoToUpdate) return res.status(404).json ({message: 'Vehiculo no encontrado'})
  }catch(error:any){
    res.status(500).json({message: error.message})
  }
}

export async function removeVehiculo(req: Request, res: Response){

  try{
    const vehiculo = await em.findOne(Vehiculo, {idVehiculo: Number(req.params.id)});
    res.status(200).json({message: 'Vehiculo eliminado'})
    if(!vehiculo) return res.status(404).json ({message: 'vehiculo no encontrado'})
    await em.removeAndFlush(vehiculo)
  }catch(error: any){
    res.status(500).json({message: error.message})

  }
}

