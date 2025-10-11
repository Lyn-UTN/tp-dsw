
import { Request, Response, NextFunction } from 'express';
import { ClienteRepository } from './cliente.repository';

const repository = new ClienteRepository();

// Middleware para sanear la entrada
export function sanitizeClienteInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    tipoDocumento: req.body.tipoDocumento,
    documento: req.body.documento,
    telefono: req.body.telefono,
    email: req.body.email,
    password: req.body.password,
    licenciaConducir: req.body.licenciaConducir,
  };

  // eliminar undefined
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

// GET todos los clientes
export async function findAll(req: Request, res: Response) {
  const clientes = await repository.findAll();
  res.json({ data: clientes });
}

// GET un cliente por ID
export async function findOne(req: Request, res: Response) {
  const cliente = await repository.findOne({ idCliente: Number(req.params.id) });
  if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json({ data: cliente });
}

// POST - crear un cliente
export async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;
  const result = await repository.add(input); // objeto plano
  res.status(201).json({ message: 'Cliente creado', data: result });
}

// PUT/PATCH - actualizar cliente
export async function update(req: Request, res: Response) {
  const result = await repository.update(Number(req.params.id), req.body.sanitizedInput);
  if (!result) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json({ message: 'Cliente actualizado', data: result });
}

// DELETE - eliminar cliente
export async function remove(req: Request, res: Response) {
  const deleted = await repository.delete({ idCliente: Number(req.params.id) });
  if (!deleted) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json({ message: 'Cliente eliminado correctamente' });
}
