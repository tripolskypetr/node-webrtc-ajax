import { Injectable } from '@nestjs/common';

import { ConfigService as NestConfigService } from '@nestjs/config';

import { IGlobal } from './interface/global.interface';
import { IDatabase } from './interface/database.interface';

import { DATABASE_CONFIG, GLOBAL_CONFIG } from './config.constants';

@Injectable()
export class ConfigService {

    constructor(
        private readonly configService: NestConfigService,
    ) { }

    public getGlobalCfg(): IGlobal {
        return this.configService.get(GLOBAL_CONFIG);
    }

    public getDatabaseCfg(): IDatabase {
        return this.configService.get(DATABASE_CONFIG);
    }

}
