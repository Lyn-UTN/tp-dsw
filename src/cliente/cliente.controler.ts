import { Request, Response, NextFunction } from 'express'
import { ClienteRepository } from './cliente.repository.js'
import { Cliente } from './cliente.entity.js'

const repository = new ClienteRepository()

function sanitizeClienteInput(req: Request, res: Response, next: NextFunction): void {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    tipoDocumento: req.body.tipoDocumento,
    numeroDocumento: req.body.numeroDocumento,
    telefono: req.body.telefono,
    email: req.body.email,
    clave: req.body.clave,
    idCliente: req.body.idCliente,
    licenciaConducir: req.body.licenciaConducir,
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

function findAll(req: Request, res: Response): void {
  res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response): void {
  const id = req.params.id
  const cliente = repository.findOne({ idCliente: id })

  if (!cliente) {
    res.status(404).send({ message: 'Cliente not found' })
    return
  }

  res.json({ data: cliente })
}

function add(req: Request, res: Response): void {
  const input = req.body.sanitizedInput

  const clienteInput = new Cliente(
    input.nombre,
    input.apellido,
    input.tipoDocumento,
    input.numeroDocumento,
    input.telefono,
    input.email,
    input.clave,
    input.idCliente,
    input.licenciaConducir
  )

  const cliente = repository.add(clienteInput)
  res.status(201).send({ message: 'Cliente created', data: cliente })
}

function update(req: Request, res: Response): void {
  req.body.sanitizedInput.idCliente = Number(req.params.id)
  const cliente = repository.update(req.body.sanitizedInput)

  if (!cliente) {
    res.status(404).send({ message: 'Cliente not found' })
    return
  }

  res.status(200).send({ message: 'Cliente updated successfully', data: cliente })
}

function remove(req: Request, res: Response): void {
  const id = req.params.id
  const cliente = repository.delete({ id })

  if (!cliente) {
    res.status(404).send({ message: 'Cliente not found' })
    return
  }

  res.status(200).send({ message: 'Cliente deleted successfully' })
}

export {
  sanitizeClienteInput,
  findAll,
  findOne,
  add,
  update,
  remove
}
