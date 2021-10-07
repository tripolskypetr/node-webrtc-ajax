import { registerAs } from "@nestjs/config";

import { IDatabase } from "../interface/database.interface";

import { DATABASE_CONFIG } from "../config.constants";

export const databaseConfig = registerAs(DATABASE_CONFIG, (): IDatabase => ({
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME || 'tripolskypetr',
    password: process.env.DATABASE_PASSWORD || '12345678',
    database: process.env.DATABASE_DATABASE || 'postgres',
    synchronize: 'DATABASE_SYNCHRONIZE' in process.env ? !!+process.env.DATABASE_SYNCHRONIZE : true,
    autoLoadEntities: 'DATABASE_AUTO_LOAD_ENTITIES' in process.env ? !!+process.env.DATABASE_AUTO_LOAD_ENTITIES : true,
}));
