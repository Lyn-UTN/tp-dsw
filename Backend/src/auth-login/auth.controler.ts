import { Request, Response } from "express";
import { Cliente } from "../cliente/cliente_entity.js";
import { EntityManager } from "@mikro-orm/core";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export class AuthController {
  constructor(private readonly em: EntityManager) {}

  // Registro de cliente
  register = async (req: Request, res: Response) => {
    try {
      const {
        nombre,
        apellido,
        tipoDocumento,
        numeroDocumento,
        telefono,
        email,
        password,
        licenciaConducir,
      } = req.body;

      if (
        !nombre ||
        !apellido ||
        !tipoDocumento ||
        !telefono ||
        !email ||
        !password
      ) {
        return res.status(400).json({ message: "Faltan campos obligatorios." });
      }

      const existingCliente = await this.em.findOne(Cliente, { email });
      if (existingCliente) {
        return res
          .status(400)
          .json({ message: "El email ya está registrado." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // casteo a 'any' para evitar que TypeScript requiera el PK (idCliente)
      // al crear una nueva entidad. Alternativas más tipadas se explican abajo.
      const cliente = this.em.create(Cliente, {
        nombre,
        apellido,
        tipoDocumento,
        numeroDocumento,
        telefono,
        email,
        password: hashedPassword,
        licenciaConducir,
      } as any);

      await this.em.persistAndFlush(cliente);

      return res
        .status(201)
        .json({ message: "Cliente registrado correctamente." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al registrar cliente." });
    }
  };

  // Login de cliente
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Faltan campos obligatorios." });
      }

      const cliente = await this.em.findOne(Cliente, { email });
      if (!cliente) {
        return res
          .status(400)
          .json({ message: "Email o contraseña incorrectos." });
      }

      const validPassword = await bcrypt.compare(password, cliente.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ message: "Email o contraseña incorrectos." });
      }

      const token = jwt.sign(
        { idCliente: cliente.idCliente, email: cliente.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login exitoso.",
        token,
        cliente: {
          idCliente: cliente.idCliente,
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          email: cliente.email,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al iniciar sesión." });
    }
  };
}
