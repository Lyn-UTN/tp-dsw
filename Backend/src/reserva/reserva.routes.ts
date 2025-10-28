import { Router } from "express";
import {
  sanitizeReservaInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from "./reserva.controler.js";

export const reservaRouter = Router();

reservaRouter.get("/", findAll);
reservaRouter.get("/:id", findOne);
reservaRouter.post("/", sanitizeReservaInput, add);
reservaRouter.put("/:id", sanitizeReservaInput, update);
reservaRouter.patch("/:id", sanitizeReservaInput, update);
reservaRouter.delete("/:id", remove);
