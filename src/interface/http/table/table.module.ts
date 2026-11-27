import { Module } from '@nestjs/common';

import { TypeOrmModule }
  from '@nestjs/typeorm';

import { TableController }
  from './table.controller';

import { CreateTableUseCase }
  from '../../../application/table/use-cases/create-table.use-case';
import { GetTablesUseCase }
  from '../../../application/table/use-cases/get-tables.use-case';
import { GetTableByIdUseCase }
  from '../../../application/table/use-cases/get-table-by-id.use-case';
import { GetTableByCodeUseCase }
  from '../../../application/table/use-cases/get-table-by-code.use-case';
import { UpdateTableUseCase }
  from '../../../application/table/use-cases/update-table.use-case';
import { ActivateTableUseCase }
  from '../../../application/table/use-cases/activate-table.use-case';
import { DeactivateTableUseCase }
  from '../../../application/table/use-cases/deactivate-table.use-case';


import { DiningTableRepository }
  from '../../../domain/table/repositories/dining-table.repository';

import { DiningTableOrmEntity }
  from '../../../infrastructure/persistence/postgres/entities/dining-table.orm-entity';

import { PostgresDiningTableRepository }
  from '../../../infrastructure/persistence/postgres/repositories/dining-table.postgres.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiningTableOrmEntity,
    ]),
  ],

  controllers: [
    TableController,
  ],

  providers: [

    CreateTableUseCase,
    GetTablesUseCase,
    GetTableByIdUseCase,
    GetTableByCodeUseCase,
    UpdateTableUseCase,
    ActivateTableUseCase,
    DeactivateTableUseCase,
    {
      provide:
      DiningTableRepository,

      useClass:
      PostgresDiningTableRepository,
    },


  ],

})
export class TableModule {}