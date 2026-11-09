import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ComboSaleController } from './combo-sale.controller';

import { CreateComboSaleUseCase } from '../../../application/combos-sale/use-cases/create-combo-sale.use-case';

import { ComboSaleOrmEntity } from '../../../infrastructure/persistence/postgres/entities/combo-sale.orm-entity';

import { ComboSaleRepository } from '../../../domain/combo-sale/repositories/combo-sale.repository';

import { PostgresComboSaleRepository } from '../../../infrastructure/persistence/postgres/repositories/combo-sale.postgres.repository';
import { GetComboSaleByIdUseCase }    from '../../../application/combos-sale/use-cases/get-combo-sale-by-id.use-case';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ComboSaleOrmEntity,
        ]),
    ],

    controllers: [
        ComboSaleController,
    ],

    providers: [
        CreateComboSaleUseCase,
        GetComboSaleByIdUseCase,

        {
            provide: ComboSaleRepository,
            useClass:
            PostgresComboSaleRepository,
        },
    ],
})
export class ComboSaleModule {}