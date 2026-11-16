import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyController } from './company.controller';

import { CompanyOrmEntity } from '../../../infrastructure/persistence/postgres/entities/company.orm-entity';

import { CompanyRepository } from '../../../domain/company/repositories/company.repository';

import { PostgresCompanyRepository } from '../../../infrastructure/persistence/postgres/repositories/company.postgres.repository';

import { CreateCompanyUseCase } from '../../../application/company/use-cases/create-company.use-case';
import { GetCompaniesUseCase }
  from '../../../application/company/use-cases/get-companies.use-case';
import { GetCompanyByIdUseCase }
  from '../../../application/company/use-cases/get-company-by-id.use-case';
import { DeactivateCompanyUseCase }
  from '../../../application/company/use-cases/deactivate-company.use-case';
import { ActivateCompanyUseCase }
  from '../../../application/company/use-cases/activate-company.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyOrmEntity,
    ]),
  ],

  controllers: [
    CompanyController,
  ],

  providers: [

    CreateCompanyUseCase,
    GetCompaniesUseCase,
    GetCompanyByIdUseCase,
    DeactivateCompanyUseCase,
    ActivateCompanyUseCase,

    {
      provide: CompanyRepository,
      useClass:
      PostgresCompanyRepository,
    },

  ],

})
export class CompanyModule {}