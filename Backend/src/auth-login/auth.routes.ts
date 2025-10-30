// src/routes/auth.routes.ts
import { Router } from "express";
import { orm } from "../shared/orm.js";
import { AuthController } from "./auth.controler.js";
import { verifyToken, AuthRequest } from "../auth-login/auth.middleware.js";
const router = Router();

const authController = new AuthController(orm.em.fork());

// Registro
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

router.get("/perfil", verifyToken, (req: AuthRequest, res) => {
  res.json({ message: "Ruta protegida", user: req.user });
});

export default router;
