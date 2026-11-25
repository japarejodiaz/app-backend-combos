import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './interface/http/health/health.controller';
import { HealthModule } from './interface/http/health/health.module';
import { ComboSaleModule } from './interface/http/combo-sale/combo-sale.module';
import { AuthModule } from './interface/http/auth/auth.module';
import { CompanyModule } from './interface/http/company/company.module';
import { UserModule }   from './interface/http/user/user.module'
import { TableModule } from './interface/http/table/table.module';

import appConfig from './infrastructure/config/app.config';
import databaseConfig from './infrastructure/config/database.config';
import authConfig from './infrastructure/config/auth.config';
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
      load: [appConfig, databaseConfig, authConfig],
    }),

    TypeOrmModule.forRootAsync(
        typeOrmAsyncConfig,
    ),

    HealthModule,
    ComboSaleModule,
    AuthModule,
    CompanyModule,
    UserModule,
    TableModule,
  ],
  controllers: [HealthController],
})

export class AppModule {}
