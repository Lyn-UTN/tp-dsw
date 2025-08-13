import { Request, Response, NextFunction } from 'express'
import { ZonaRepository } from './zona.repository.js'
import { Zona } from './zona.entity.js'

const repository = new ZonaRepository()

function sanitizeZonaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    idZona: req.body.idZona,
    nombreZona: req.body.nombreZona,
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response): void{
  const id = Number(req.params.id)
  const zona = repository.findOne({ id })
  if (!zona) {
    res.status(404).send({ message: 'Zona not found' })
    return
  }
  res.json({ data: zona })
}

function add(req: Request, res: Response): void {
  const input = req.body.sanitizedInput
  const zonaInput = new Zona(
    input.idZona,
    input.nombreZona
  )

  const zona = repository.add(zonaInput)
  res.status(201).send({ message: 'Zona created', data: zona })
  return
}

function update(req: Request, res: Response): void {
  req.body.sanitizedInput.id = req.params.id
  const zona = repository.update(req.body.sanitizedInput)

  if (!zona) {
    res.status(404).send({ message: 'Zona not found' })
    return 
  }

  res.status(200).send({ message: 'Zona updated successfully', data: zona })
  return
}

function remove(req: Request, res: Response) {
  const id = Number(req.params.id)
  const zona = repository.delete({ id })

  if (!zona) {
    res.status(404).send({ message: 'Zona not found' })
  } else {
    res.status(200).send({ message: 'Zona deleted successfully' })
  }
}

export { sanitizeZonaInput, findAll, findOne, add, update, remove }