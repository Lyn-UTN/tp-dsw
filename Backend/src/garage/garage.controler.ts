// garage.controller.ts
import { orm } from "../shared/orm.js";
import { Request, Response, NextFunction } from "express";
import { Garage } from "./garage_entity.js";
import { Zona } from "../zona/zona_entity.js"; // usado si queremos popular Zona
import { wrap } from "@mikro-orm/core";

// Usa fork() para cada request (buena práctica)
const getEm = () => orm.em.fork();

//función para ayudar a que el filtrado sea mucho mas flexible
function normalizeText(str: string) {
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // quitar signos
    .replace(/\s+/g, " ") // normalizar espacios
    .trim();
}

export function sanitizeGarageInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { titulo, direccion, tipoGarage, mailDueno, estado, zonaId, precio } =
    req.body;

  const sanitizedInput: any = {
    titulo: titulo?.trim(),
    direccion: direccion?.trim(),
    tipoGarage: tipoGarage?.trim(),
    mailDueno: mailDueno?.trim(),
    estado: estado?.trim(),
    zonaId: zonaId ? Number(zonaId) : undefined,
  };

  Object.keys(sanitizedInput).forEach((key) => {
    if (sanitizedInput[key] === undefined || sanitizedInput[key] === "") {
      delete sanitizedInput[key];
    }
  });

  req.body.sanitizedInput = sanitizedInput;
  next();
}

export async function findAll(req: Request, res: Response) {
  try {
    const em = getEm();

    // Si viene ?direccion=term entonces filtramos por direccion o titulo
    const direccionQuery = (req.query.direccion as string) || "";
    const limit = req.query.limit ? Number(req.query.limit) : 100;

    if (direccionQuery && direccionQuery.trim() !== "") {
      const term = direccionQuery.trim();

      // Intentamos filtrar en la DB si el driver lo soporta (Postgres: ILIKE).
      // Para mantener compatibilidad con distintos DBs, si falla la consulta avanzada,
      // hacemos fallback a traer todos y filtrar en memoria (válido para dataset pequeño).
      try {
        // Postgres: ILIKE para case-insensitive. Si usás MySQL/SQLite puede requerir cambiar a LIKE.
        const qb = em
          .createQueryBuilder(Garage, "g")
          .select(["g.*", "z.*"])
          .leftJoinAndSelect("g.zona", "z")
          .where(
            "LOWER(g.direccion) LIKE LOWER(?) OR LOWER(g.titulo) LIKE LOWER(?)",
            [`%${term}%`, `%${term}%`]
          )
          .limit(limit);

        const garages = await qb.getResultList(); // devuelve entidades completas con relaciones
        const garagesJson = garages.map((g) => wrap(g).toJSON());

        return res.json({ data: garagesJson });
      } catch (err) {
        console.warn(
          "QueryBuilder search failed (fallando a filtro en memoria):",
          (err as any).message
        );

        // Fallback: traer todos y filtrar en memoria (pequeña carga de datos)
        const all = await em.find(Garage, {}, { populate: ["zona"], limit });

        const filtered = all.filter((g) => {
          const direccion = normalizeText(g.direccion || "");
          const titulo = normalizeText(g.titulo || "");
          const searchTerms = normalizeText(term).split(" ");

          return searchTerms.every(
            (t) => direccion.includes(t) || titulo.includes(t)
          );
        });

        return res.json({ data: filtered.map((g) => wrap(g).toJSON()) });
      }
    }

    // Si no hay query `direccion`, devolvemos todos (limit por si acaso)
    const garages = await em.find(Garage, {}, { populate: ["zona"], limit });
    const garagesJson = garages.map((g) => wrap(g).toJSON());

    res.json({ data: garagesJson });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    const em = getEm();
    const garage = await em.findOne(
      Garage,
      { idGarage: Number(req.params.id) },
      { populate: ["zona"] }
    );
    if (!garage)
      return res.status(404).json({ message: "Garage no enccontrado" });
    res.json({ data: garage });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function addGarage(req: Request, res: Response) {
  try {
    const em = getEm();

    // usamos sanitizedInput que genera tu middleware sanitizeGarageInput (si lo aplicás)
    const payload = req.body.sanitizedInput ?? req.body;

    // Si viene zonaId transformamos a entidad Zona (si corresponde)
    if (payload.zonaId) {
      const zona = await em.findOne(Zona, { id: Number(payload.zonaId) });
      if (zona) {
        payload.zona = zona;
        delete payload.zonaId;
      }
    }

    // IMPORTANTE: usar persistAndFlush para asegurar que se inserte en DB.
    // Antes tenías em.create(...) + em.flush(); em.create no marca la entidad para persistir
    // en todos los casos: persistAndFlush es más explícito y seguro.
    const garage = em.create(Garage, payload);
    await em.persistAndFlush(garage);

    res.status(201).json({ message: "Garage creado", data: garage });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export async function deleteGarage(req: Request, res: Response) {
  try {
    const em = getEm();
    const garageToDelete = await em.findOne(Garage, {
      idGarage: Number(req.params.id),
    });
    if (!garageToDelete)
      return res.status(404).json({ message: "Garage no encontrado" });

    await em.removeAndFlush(garageToDelete);
    res.json({ message: "Garage eliminado" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export async function updateGarage(req: Request, res: Response) {
  try {
    const em = getEm();
    const garageToUpdate = await em.findOne(Garage, {
      idGarage: Number(req.params.id),
    });
    if (!garageToUpdate)
      return res.status(404).json({ message: "Garage no encontrado" });

    const payload = req.body.sanitizedInput ?? req.body;

    // Si viene zonaId, obtengo la entidad zona
    if (payload.zonaId) {
      const zona = await em.findOne(Zona, { id: Number(payload.zonaId) });
      if (zona) {
        payload.zona = zona;
        delete payload.zonaId;
      }
    }

    // Assignar campos (MikroORM actualizará la entidad gestionada)
    em.assign(garageToUpdate, payload);
    await em.flush();

    res.json({ message: "Garage actualizado", data: garageToUpdate });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

/* import {orm} from "../shared/orm.js";
import {Request, Response, NextFunction} from  "express";
import {Garage} from "./garage_entity.js";
//import {Cliente} from "../cliente/cliente_entity.js";

const em=orm.em;

export function sanitizeGarageInput(req: Request, res: Response, next: NextFunction) {
  const { titulo, direccion, tipoGarage, mailDueno, estado, zonaId } = req.body;

  const sanitizedInput: any = {
    titulo: titulo?.trim(),
    direccion: direccion?.trim(),
    tipoGarage: tipoGarage?.trim(),
    mailDueno: mailDueno?.trim(),
    estado: estado?.trim(),
    zonaId: zonaId ? Number(zonaId) : undefined,
  };

  // Eliminar campos vacíos o undefined
  Object.keys(sanitizedInput).forEach((key) => {
    if (sanitizedInput[key] === undefined || sanitizedInput[key] === "") {
      delete sanitizedInput[key];
    }
  });

  req.body.sanitizedInput = sanitizedInput;
  next();
}


export async function findAll(req: Request, res: Response){

    try{

        const garages = await em.findAll(Garage);
        res.json({data: garages})

    }catch(error: any){
        res.status(500).json({message: error.message})
    }

}

export async function findOne(req: Request, res: Response){

    try{

        const garage = await em.findOne(Garage, {idGarage: Number(req.params.id)});
        if(!garage) return res.status(404).json ({message: 'Garage no enccontrado'})
        res.json ({data: garage})

    }catch(error: any){
        res.status(500).json ({message: error.message})
    }
}

export async function addGarage(req: Request, res: Response){

    try{

        const garage = em.create(Garage, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json({message: "Garage creado", data: garage});

    }catch(error: any){

        res.status(500).json ({message: error.message})
    }

}


export async function deleteGarage(req: Request, res: Response){

    try{
        const garageToDelete = await em.findOne(Garage, {idGarage: Number(req.params.id)});
        if(!garageToDelete) return res.status(404).json ({message: 'Garage no encontrado'})
    }catch(error: any ){

    }
}


export async function updateGarage(req: Request, res: Response){

    try{

        const garageToUpdate = await em.findOne(Garage, {idGarage: Number(req.params.id)});
        if(!garageToUpdate) return res.status(404).json ({message: 'Garage no encontrado'})

    }catch(error: any){
        res.status(500).json({message: error.message})
    }
} */
