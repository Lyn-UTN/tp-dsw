import { Request, Response, NextFunction } from "express";
import { Reserva } from "./reserva_entity.js";
import { orm } from "../shared/orm.js";

const em = orm.em;

function sanitizeReservaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    fechaReserva: req.body.fechaReserva,
    fechaDesde: req.body.fechaDesde,
    fechaHasta: req.body.fechaHasta,
    horaDesde: req.body.horaDesde,
    horaHasta: req.body.horaHasta,
    estadoRes: req.body.estadoRes,
    tipoReserva: req.body.tipoReserva, // ← ID del tipodereserva
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

async function findAll(/*req: Request,*/ res: Response) {
  try {
    const reservas = await em.find(Reserva, {}, { populate: ["tipoReserva"] });
    res.status(200).json({ message: "todas las reservas", data: reservas });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const reserva = await em.findOneOrFail(
      Reserva,
      { idReserva: id },
      { populate: ["tipoReserva"] }
    );
    res.status(200).json({ message: "reserva encontrada", data: reserva });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const reserva = em.create(Reserva, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: "reserva creada", data: reserva });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const reservaToUpdate = await em.findOneOrFail(Reserva, { idReserva: id });
    em.assign(reservaToUpdate, req.body.sanitizedInput);
    await em.flush();
    res
      .status(200)
      .json({ message: "reserva actualizada", data: reservaToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

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
