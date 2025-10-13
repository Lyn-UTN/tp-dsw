import * as dotenv from "dotenv";

dotenv.config();
console.log({
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});
import { MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql"; // Esto en la v5 es nuevo, antes se usaba 'type'
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
/*Importo entidades */
import { TipoVehiculo} from "../tipoVehiculo/tipoVehiculo_entity.js";
import { Vehiculo } from "../vehiculo/vehiculo_entity.js";
import { Tiporeserva } from "../tipoReserva/tipoReserva_entity.js";
import { Reserva } from "../reserva/reserva_entity.js";
import { Cliente } from "../cliente/cliente_entity.js";
import { Garage } from "../garage/garage_entity.js";
import { Zona } from "../zona/zona_entity.js";  

export const orm = await MikroORM.init<MySqlDriver>({
    entities: [Vehiculo, TipoVehiculo, Cliente, Garage, Reserva, Tiporeserva, Zona],
    entitiesTs: ['Backend/src/**/*_entity.ts'],
    dbName: process.env.DB_NAME,
    clientUrl: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    driver: MySqlDriver,
    debug: true,
    highlighter: new SqlHighlighter(),
    schemaGenerator: {
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
    },
})

export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator()
    
    await generator.dropSchema()
    await generator.createSchema()
    
    await generator.updateSchema()
}