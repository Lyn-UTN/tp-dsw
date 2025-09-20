import * as dotenv from "dotenv";

dotenv.config();

import { MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql"; // Esto en la v5 es nuevo, antes se usaba 'type'
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";


export const orm = await MikroORM.init<MySqlDriver>({
    entities: ['dist/**/*_entity.js'],
    entitiesTs: ['src/**/*_entity.ts'],
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
    /*
    await generator.dropSchema()
    await generator.createSchema()
    */
    await generator.updateSchema()
}