import { Router } from "express";
import { loginCliente } from "./auth.controler.js";

const router = Router();

// Ruta para login
router.post("/login", loginCliente);

export default router;
