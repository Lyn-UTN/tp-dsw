import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/orm.js";
import { Cliente } from "./cliente_entity.js";
//c
// Middleware para sanear la entrada
export function sanitizeClienteInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
  const clientes = await orm.em.find(Cliente, {});
  res.json({ data: clientes });
}

// GET un cliente por email
export async function getClienteByEmail(req: Request, res: Response) {
  const cliente = await orm.em.findOne(Cliente, { email: req.params.email });
  if (!cliente)
    return res.status(404).json({ message: "Cliente no encontrado" });
  res.json({ data: cliente });
}

// GET un cliente por id
export async function findOne(req: Request, res: Response) {
  const cliente = await orm.em.findOne(Cliente, {
    idCliente: Number(req.params.id),
  });
  if (!cliente)
    return res.status(404).json({ message: "Cliente no encontrado" });
  res.json({ data: cliente });
}

// POST - crear un cliente
export async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const cliente = orm.em.create(Cliente, input);
  await orm.em.persistAndFlush(cliente);

  res.status(201).json({ message: "Cliente creado", data: cliente });
}

// PUT/PATCH - actualizar cliente
export async function update(req: Request, res: Response) {
  const cliente = await orm.em.findOne(Cliente, {
    idCliente: Number(req.params.id),
  });

  if (!cliente)
    return res.status(404).json({ message: "Cliente no encontrado" });

  orm.em.assign(cliente, req.body.sanitizedInput);
  await orm.em.persistAndFlush(cliente);

  res.json({ message: "Cliente actualizado", data: cliente });
}

// DELETE - eliminar cliente
export async function remove(req: Request, res: Response) {
  const cliente = await orm.em.findOne(Cliente, {
    idCliente: Number(req.params.id),
  });

  if (!cliente)
    return res.status(404).json({ message: "Cliente no encontrado" });

  await orm.em.removeAndFlush(cliente);
  res.json({ message: "Cliente eliminado correctamente" });
}
