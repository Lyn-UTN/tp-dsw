import { Request, Response, NextFunction } from "express";
import { Tiporeserva } from "./tipoReserva_entity.js";
import { orm } from "../shared/orm.js";

const em = orm.em;

function sanitizeTipoReservaInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const valoresValidos = ["xDia", "xMes", "xHora"];
  if (
    req.body.descTipoReserva &&
    !valoresValidos.includes(req.body.descTipoReserva)
  ) {
    return res.status(400).json({
      message: `???, Los valores permitidos son: ${valoresValidos}`,
    });
  }

  req.body.sanitizedInput = {
    descTipoReserva: req.body.descTipoReserva,
  };

  // eliminar undefined
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const tiposReserva = await em.find(Tiporeserva, {});
    res
      .status(200)
      .json({ message: "Todos los tiposReserva", data: tiposReserva });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipoReserva = await em.findOneOrFail(Tiporeserva, {
      idtiporeserva: id,
    });
    res
      .status(200)
      .json({ message: "Un tipoReserva especifico", data: tipoReserva });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const tipoReserva = em.create(Tiporeserva, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: "tipoReserva creado", data: tipoReserva });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipoReservaToUpdate = await em.findOneOrFail(Tiporeserva, {
      idtiporeserva: id,
    });
    em.assign(tipoReservaToUpdate, req.body.sanitizedInput);
    await em.flush();
    res
      .status(200)
      .json({
        message: "tipoReserva modificado/update",
        data: tipoReservaToUpdate,
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipoReserva = await em.findOneOrFail(Tiporeserva, {
      idtiporeserva: id,
    });
    await em.removeAndFlush(tipoReserva);
    res.status(200).json({ message: "tipoReserva borrado" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeTipoReservaInput, findAll, findOne, add, update, remove };
