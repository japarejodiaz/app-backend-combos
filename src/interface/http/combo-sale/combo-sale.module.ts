import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ComboSaleController } from './combo-sale.controller';

import { CreateComboSaleUseCase } from '../../../application/combos-sale/use-cases/create-combo-sale.use-case';

import { ComboSaleOrmEntity } from '../../../infrastructure/persistence/postgres/entities/combo-sale.orm-entity';

import { ComboSaleRepository } from '../../../domain/combo-sale/repositories/combo-sale.repository';

import { PostgresComboSaleRepository } from '../../../infrastructure/persistence/postgres/repositories/combo-sale.postgres.repository';
import { GetComboSaleByIdUseCase }    from '../../../application/combos-sale/use-cases/get-combo-sale-by-id.use-case';
import { DeliverUnitsUseCase } from '../../../application/combos-sale/use-cases/deliver-units.use-case';
import { DeliveryLogOrmEntity } from '../../../infrastructure/persistence/postgres/entities/delivery-log.orm-entity';
import { UserOrmEntity } from '../../../infrastructure/persistence/postgres/entities/user.orm-entity';

import { DeliveryLogRepository } from '../../../domain/delivery-log/repositories/delivery-log.repository';

import { DeliveryLogPostgresRepository } from '../../../infrastructure/persistence/postgres/repositories/delivery-log.postgres.repository';

import { GetDeliveriesByComboSaleUseCase } from '../../../application/combos-sale/use-cases/get-deliveries-by-combo-sale.use-case';
import { QrGeneratorService }
    from '../../../infrastructure/qr/qr-generator.service';

import { GenerateQrUseCase }
    from '../../../application/combos-sale/use-cases/qr/generate-qr.use-case';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            ComboSaleOrmEntity,
            DeliveryLogOrmEntity,
            UserOrmEntity,
        ]),
    ],

    controllers: [
        ComboSaleController,
    ],

    providers: [
        CreateComboSaleUseCase,
        GetComboSaleByIdUseCase,
        DeliverUnitsUseCase,
        GetDeliveriesByComboSaleUseCase,
        QrGeneratorService,
        GenerateQrUseCase,

        {
            provide: ComboSaleRepository,
            useClass: PostgresComboSaleRepository,
        },

        {
            provide: DeliveryLogRepository,
            useClass: DeliveryLogPostgresRepository,
        },
    ],
})
export class ComboSaleModule {}