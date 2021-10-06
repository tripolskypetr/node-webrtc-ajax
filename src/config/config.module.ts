import { Module } from '@nestjs/common';

import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

import { globalConfig } from './config/global.config';
import { databaseConfig } from './config/database.config';

@Module({
    imports:[
        NestConfigModule.forRoot({
            load: [
                globalConfig,
                databaseConfig,
            ],
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigModule {}
