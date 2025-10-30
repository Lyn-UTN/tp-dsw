import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/orm.js";
import { Cliente } from "./cliente_entity.js";

const em = orm.em;
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
    numeroDocumento: req.body.numeroDocumento,
    telefono: req.body.telefono,
    email: req.body.email,
    password: req.body.password,
    licenciaConducir: req.body.licenciaConducir,
  };
  // Eliminar campos vacios (undefined)
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

// GET todos los clientes
export async function findAll(req: Request, res: Response) {
  try {
    const clientes = await orm.em.find(Cliente, {});
    res.json({ data: clientes });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los clientes" });
  }
}

// GET un cliente por email
export async function getClienteByEmail(req: Request, res: Response) {
  try {
    const cliente = await orm.em.findOne(Cliente, { email: req.params.email });
    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.json({ data: cliente });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el cliente por email" });
  }
}

// GET un cliente por id
export async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID invalido" });
    }

    const cliente = await em.findOne(Cliente, { idCliente: id });
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.status(200).json({ message: "Ok", data: cliente });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el cliente" });
  }
}

// POST - crear un cliente
export async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;
  try {
    // Cast a 'any' to avoid TypeScript requiring the PK when creating a new entity
    const cliente = orm.em.create(Cliente, input as any);
    await orm.em.persistAndFlush(cliente);
    res.status(201).json({ message: "Cliente creado", data: cliente });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el cliente" });
  }
}

// PUT/PATCH - actualizar cliente
export async function update(req: Request, res: Response) {
  try {
    const cliente = await orm.em.findOne(Cliente, {
      idCliente: Number(req.params.id),
    });

    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado" });

    orm.em.assign(cliente, req.body.sanitizedInput);
    await orm.em.persistAndFlush(cliente);

    res.json({ message: "Cliente actualizado", data: cliente });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el cliente" });
  }
}

// DELETE - eliminar cliente
export async function remove(req: Request, res: Response) {
  try {
    const cliente = await orm.em.findOne(Cliente, {
      idCliente: Number(req.params.id),
    });

    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado" });

    await orm.em.removeAndFlush(cliente);
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el cliente" });
  }
}
