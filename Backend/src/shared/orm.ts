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


export const orm = await MikroORM.init<MySqlDriver>({
    entities: ['Backend/dist/**/*_entity.js'],
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