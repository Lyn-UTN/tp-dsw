import { Request, Response, NextFunction } from 'express'
import { Zona } from './zona_entity.js'
import { orm } from '../shared/orm.js'

const em = orm.em

function sanitizeZonaInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.idZona,
    nombreZona: req.body.nombreZona
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
    const zonas = await em.find(Zona, {})
    res.status(200).json({ message: 'zonas encontradas', data: zonas })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const zona = await em.findOneOrFail(Zona, { id })
    res.status(200).json({ message: 'zona encontrada', data: zona })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const zona = em.create(Zona, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'zona creada', data: zona })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const zonaToUpdate = await em.findOneOrFail(Zona, { id })
    em.assign(zonaToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'zona actualizada', data: zonaToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const zona = em.getReference(Zona, id)
    await em.removeAndFlush(zona)
    res.status(200).json({ message: 'zona eliminada' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeZonaInput, findAll, findOne, add, update, remove }