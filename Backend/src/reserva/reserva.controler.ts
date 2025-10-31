import { Request, Response, NextFunction } from "express";
import { Reserva } from "./reserva_entity.js";
import { Tiporeserva } from "../tipoReserva/tipoReserva_entity.js";
import { Cliente } from "../cliente/cliente_entity.js";
import { Garage } from "../garage/garage_entity.js";
import { orm } from "../shared/orm.js";

const em = orm.em;

// Middleware para sanitizar input
function sanitizeReservaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    fechaReserva: req.body.fechaReserva,
    fechaDesde: req.body.fechaDesde,
    fechaHasta: req.body.fechaHasta,
    horaDesde: req.body.horaDesde,
    horaHasta: req.body.horaHasta,
    estadoRes: req.body.estadoRes,
    tipoReserva: req.body.tipoReserva, // ID del tipo de reserva
    cliente: req.body.cliente,         // ID del cliente
    garage: req.body.garage,           // ID del garage
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

// Listar todas las reservas
async function findAll(req: Request, res: Response) {
  try {
    const reservas = await em.find(Reserva, {}, { populate: ["tipoReserva", "cliente", "garage"] });
    res.status(200).json({ message: "todas las reservas", data: reservas });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Obtener una reserva por ID
async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const reserva = await em.findOneOrFail(
      Reserva,
      { idReserva: id },
      { populate: ["tipoReserva", "cliente", "garage"] }
    );
    res.status(200).json({ message: "reserva encontrada", data: reserva });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Crear una nueva reserva
async function add(req: Request, res: Response) {
  try {
    const { tipoReserva, cliente, garage, ...rest } = req.body.sanitizedInput;

    const reserva = em.create(Reserva, {
      ...rest,
      tipoReserva: em.getReference(Tiporeserva, tipoReserva),
      cliente: em.getReference(Cliente, cliente),
      garage: em.getReference(Garage, garage),
    });

    await em.flush();
    res.status(201).json({ message: "reserva creada", data: reserva });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar una reserva
async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const reservaToUpdate = await em.findOneOrFail(Reserva, { idReserva: id });
    
    const { tipoReserva, cliente, garage, ...rest } = req.body.sanitizedInput;
    
    em.assign(reservaToUpdate, {
      ...rest,
      ...(tipoReserva ? { tipoReserva: em.getReference(Tiporeserva, tipoReserva) } : {}),
      ...(cliente ? { cliente: em.getReference(Cliente, cliente) } : {}),
      ...(garage ? { garage: em.getReference(Garage, garage) } : {}),
    });

    await em.flush();
    res.status(200).json({ message: "reserva actualizada", data: reservaToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Eliminar una reserva
async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const reserva = await em.findOneOrFail(Reserva, { idReserva: id });
    await em.removeAndFlush(reserva);
    res.status(200).json({ message: "reserva eliminada" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeReservaInput, findAll, findOne, add, update, remove };
