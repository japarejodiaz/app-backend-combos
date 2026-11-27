import { Module }
  from '@nestjs/common';

import { TypeOrmModule }
  from '@nestjs/typeorm';

import { ComboController }
  from './combo.controller';

import { ComboOrmEntity }
  from '../../../infrastructure/persistence/postgres/entities/combo.orm-entity';

import { CreateComboUseCase }
  from '../../../application/combo/use-cases/create-combo.use-case';

import { GetCombosUseCase }
  from '../../../application/combo/use-cases/get-combos.use-case';

import { GetComboByIdUseCase }
  from '../../../application/combo/use-cases/get-combo-by-id.use-case';
import { UpdateComboUseCase }
  from '../../../application/combo/use-cases/update-combo.use-case';
import { DeactivateComboUseCase }
  from '../../../application/combo/use-cases/deactivate-combo.use-case';
import { ActivateComboUseCase }
  from '../../../application/combo/use-cases/activate-combo.use-case';

import { ComboRepository }
  from '../../../domain/combo/repositories/combo.repository';

import { PostgresComboRepository }
  from '../../../infrastructure/persistence/postgres/repositories/combo.postgres.repository';

@Module({

  imports: [

    TypeOrmModule.forFeature([
      ComboOrmEntity,
    ]),

  ],

  controllers: [
    ComboController,
  ],

  providers: [

    CreateComboUseCase,
    GetCombosUseCase,
    GetComboByIdUseCase,
    UpdateComboUseCase,
    DeactivateComboUseCase,
    ActivateComboUseCase,

    {
      provide: ComboRepository,
      useClass:
      PostgresComboRepository,
    },

  ],

  exports: [

    {
      provide: ComboRepository,
      useClass:
      PostgresComboRepository,
    },

  ],

})
export class ComboModule {}