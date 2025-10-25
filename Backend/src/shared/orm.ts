import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

/* Importo entidades */
import { TipoVehiculo } from '../tipoVehiculo/tipoVehiculo_entity.js';
import { Vehiculo } from '../vehiculo/vehiculo_entity.js';
import { Tiporeserva } from '../tipoReserva/tipoReserva_entity.js';
import { Reserva } from '../reserva/reserva_entity.js';
import { Cliente } from '../cliente/cliente_entity.js';
import { Garage } from '../garage/garage_entity.js';
import { Zona } from '../zona/zona_entity.js';

// 🔧 Configuración directa sin dotenv, con valores por defecto
const DB_NAME = process.env.DB_NAME || 'AIRBNG';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD =
  process.env.DB_PASSWORD ||
  ''; /*agreguen su contraseña de mysql entre las comillas*/
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 3306;

console.log({
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
});

export const orm = await MikroORM.init<MySqlDriver>({
  entities: [
    Vehiculo,
    TipoVehiculo,
    Cliente,
    Garage,
    Reserva,
    Tiporeserva,
    Zona,
  ],
  entitiesTs: ['Backend/src/**/*_entity.ts'],
  dbName: DB_NAME,
  clientUrl: `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  driver: MySqlDriver,
  debug: true,
  highlighter: new SqlHighlighter(),
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();

  await generator.dropSchema();
  await generator.createSchema();
  await generator.updateSchema();
};
