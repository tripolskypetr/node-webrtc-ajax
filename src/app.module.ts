import { Module } from '@nestjs/common';

import { join } from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { SchemaModule } from './schema/schema.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        ...(configService.getDatabaseCfg() as object)
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule,
    SchemaModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
