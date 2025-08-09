import { MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql"; // Esto en la v5 es nuevo, antes se usaba 'type'
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export const orm = await MikroORM.init<MySqlDriver>({
    entities: ['dist/**/*_entity.js'],
    entitiesTs: ['src/**/*_entity.ts'],
    dbName: 'tpdsw',
    clientUrl: 'mysql://root:aldao338@localhost:3306/tpdsw',
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