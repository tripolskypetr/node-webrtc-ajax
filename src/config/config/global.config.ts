import { registerAs } from "@nestjs/config";

import { IGlobal } from "../interface/global.interface";

import { GLOBAL_CONFIG } from "../config.constants";

export const globalConfig = registerAs(GLOBAL_CONFIG, (): IGlobal => ({
    enviroment: process.env.ENVIROMENT || 'development',
}));
