import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Falta el token" });

  const token = authHeader.split(" ")[1]; // formato: "Bearer <token>"

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // guardamos los datos del usuario en la request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
