import {orm} from "../shared/orm.js";
import {Request, Response, NextFunction} from  "express";
import {Garage} from "./garage_entity.js";
//import {Cliente} from "../cliente/cliente_entity.js";

const em=orm.em;

export function sanitizeGarageInput(req: Request, res: Response, next: NextFunction) {
  const { titulo, direccion, tipoGarage, mailDueno, estado, zonaId } = req.body;

  const sanitizedInput: any = {
    titulo: titulo?.trim(),
    direccion: direccion?.trim(),
    tipoGarage: tipoGarage?.trim(),
    mailDueno: mailDueno?.trim(),
    estado: estado?.trim(),
    zonaId: zonaId ? Number(zonaId) : undefined,
  };

  // Eliminar campos vacíos o undefined
  Object.keys(sanitizedInput).forEach((key) => {
    if (sanitizedInput[key] === undefined || sanitizedInput[key] === "") {
      delete sanitizedInput[key];
    }
  });

  req.body.sanitizedInput = sanitizedInput;
  next();
}


export async function findAll(req: Request, res: Response){

    try{

        const garages = await em.findAll(Garage);
        res.json({data: garages})

    }catch(error: any){
        res.status(500).json({message: error.message})
    }

}

export async function findOne(req: Request, res: Response){

    try{

        const garage = await em.findOne(Garage, {idGarage: Number(req.params.id)});
        if(!garage) return res.status(404).json ({message: 'Garage no enccontrado'})
        res.json ({data: garage})

    }catch(error: any){
        res.status(500).json ({message: error.message})
    }
}

export async function addGarage(req: Request, res: Response){

    try{

        const garage = em.create(Garage, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json({message: "Garage creado", data: garage});

    }catch(error: any){

        res.status(500).json ({message: error.message})
    }

}


export async function deleteGarage(req: Request, res: Response){

    try{
        const garageToDelete = await em.findOne(Garage, {idGarage: Number(req.params.id)});
        if(!garageToDelete) return res.status(404).json ({message: 'Garage no encontrado'})
    }catch(error: any ){

    }
}


export async function updateGarage(req: Request, res: Response){

    try{

        const garageToUpdate = await em.findOne(Garage, {idGarage: Number(req.params.id)});
        if(!garageToUpdate) return res.status(404).json ({message: 'Garage no encontrado'})

    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}