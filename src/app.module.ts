import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './interface/http/health/health.controller';
import { HealthModule } from './interface/http/health/health.module';
import { ComboSaleModule } from './interface/http/combo-sale/combo-sale.module';

import appConfig from './infrastructure/config/app.config';
import databaseConfig from './infrastructure/config/database.config';
import { envValidationSchema } from './infrastructure/config/env.validation';
import { typeOrmAsyncConfig } from './infrastructure/database/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'develop'}`
      ],
      validationSchema: envValidationSchema,
      load: [appConfig, databaseConfig],
    }),

    TypeOrmModule.forRootAsync(
        typeOrmAsyncConfig,
    ),

    HealthModule,
    ComboSaleModule,
  ],
  controllers: [HealthController],
})

export class AppModule {}
