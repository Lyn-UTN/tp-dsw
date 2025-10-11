import { Request,Response, NextFunction } from "express";
import { TipoVehiculo } from "./tipoVehiculo_entity.js";
import { orm } from "../shared/orm.js";

const em = orm.em

function sanitizeTipoVehiculoInput(
    req: Request,
    res: Response,
    next: NextFunction
) {
    req.body.sanitizedInput = {
        descTipoVehiculo: req.body.descTipoVehiculo,
    }

Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function findAll(req: Request, res: Response) {
  try {
    const tipoVehiculos = await em.find(
      TipoVehiculo,
      {},
      { populate: ['descTipoVehiculo'] }
    )
    res.status(200).json({ message: 'found all tipoVehiculos', data: tipoVehiculos })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tipoVehiculo = await em.findOneOrFail(
      TipoVehiculo,
      { id },
      { populate: ['descTipoVehiculo'] }
    )
    res.status(200).json({ message: 'found tipoVehiculo', data: tipoVehiculo })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const tipoVehiculo = em.create(TipoVehiculo, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'tipoVehiculo created', data: tipoVehiculo })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tipoVehiculoToUpdate = await em.findOneOrFail(TipoVehiculo, { id })
    em.assign(tipoVehiculoToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'tipoVehiculo updated', data: tipoVehiculoToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tipoVehiculo = em.getReference(TipoVehiculo, id)
    await em.removeAndFlush(tipoVehiculo)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeTipoVehiculoInput, findAll, findOne, add, update, remove }