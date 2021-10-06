import { Module } from '@nestjs/common';

import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { SchemaModule } from './schema/schema.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        console.log(configService.getDatabaseCfg());
        return ({
          ...(configService.getDatabaseCfg() as object)
        });
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ConfigModule,
    SchemaModule,
  ],
})
export class AppModule {}
