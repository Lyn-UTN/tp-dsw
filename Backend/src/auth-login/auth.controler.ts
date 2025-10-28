import { Request, Response } from "express";
import { Cliente } from "../cliente/cliente_entity.js";
import { orm } from "../shared/orm.js";

const em = orm.em.fork();
export const loginCliente = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    // Buscar cliente por email
    const cliente = await em.findOne(Cliente, { email });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Comparar contraseñas (sin encriptar)
    if (cliente.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Si pasa todas las validaciones
    return res.status(200).json({
      message: "Login exitoso",
      cliente: {
        idCliente: cliente.idCliente,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        email: cliente.email,
      },
    });
  } catch (error) {
    console.error("Error al intentar loguear:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
