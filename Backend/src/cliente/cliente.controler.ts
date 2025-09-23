import { Request, Response, NextFunction } from 'express';
import { ClienteRepository } from './cliente.repository.js';
import { Cliente } from './cliente.entity.js';

const repository = new ClienteRepository();

// Middleware para sanear la entrada de datos
function sanitizeClienteInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    // Campos heredados de Usuario
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    tipoDocumento: req.body.tipoDocumento,
    documento: req.body.documento,
    telefono: req.body.telefono,
    email: req.body.email,
    password: req.body.password,

    // Campos propios de Cliente
    idUsuario: req.body.idUsuario, // opcional en updates
    idCliente: req.body.idCliente, // opcional en updates
    licenciaConducir: req.body.licenciaConducir,
  };

  // Eliminar propiedades undefined
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

async function findAll(req: Request, res: Response) {
  res.json({ data: await repository.findAll() });
}

async function findOne(req: Request, res: Response) {
  const idCliente = req.params.id;
  const cliente = await repository.findOne({ id: idCliente });
  if (!cliente) {
    return res.status(404).send({ message: 'Cliente no encontrado' });
  }
  res.json({ data: cliente });
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const clienteInput = new Cliente(
    input.idUsuario || 0, // Se asigna luego en repository.add
    input.nombre,
    input.apellido,
    input.tipoDocumento,
    input.documento,
    input.telefono,
    input.email,
    input.password,
    input.idCliente || 0, // Se asigna luego en repository.add
    input.licenciaConducir
  );

  const cliente = await repository.add(clienteInput);
  return res.status(201).send({ message: 'Cliente creado', data: cliente });
}

async function update(req: Request, res: Response) {
  const cliente = await repository.update(req.params.id, req.body.sanitizedInput);

  if (!cliente) {
    return res.status(404).send({ message: 'Cliente no encontrado' });
  }

  return res.status(200).send({ message: 'Cliente actualizado correctamente', data: cliente });
}

async function remove(req: Request, res: Response) {
  const id = req.params.id;
  const cliente = await repository.delete({ id });

  if (!cliente) {
    res.status(404).send({ message: 'Cliente no encontrado' });
  } else {
    res.status(200).send({ message: 'Cliente eliminado correctamente' });
  }
}

export { sanitizeClienteInput, findAll, findOne, add, update, remove };
