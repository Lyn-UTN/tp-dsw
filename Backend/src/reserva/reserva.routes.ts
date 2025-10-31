import { Router } from "express";
import { RequestContext } from "@mikro-orm/core";
import { orm } from "../shared/orm.js";
import {
  sanitizeReservaInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from "./reserva.controler.js";

export const reservaRouter = Router();

//middleware: crea un RequestContext por cada request para que `em` funcione bien
reservaRouter.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

reservaRouter.get("/", findAll);
reservaRouter.get("/:id", findOne);
reservaRouter.post("/", sanitizeReservaInput, add);
reservaRouter.put("/:id", sanitizeReservaInput, update);
reservaRouter.patch("/:id", sanitizeReservaInput, update);
reservaRouter.delete("/:id", remove);
