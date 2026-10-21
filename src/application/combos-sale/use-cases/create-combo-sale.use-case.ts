import { Injectable } from '@nestjs/common';

import { randomUUID } from 'crypto';
import { ComboSale } from '../../../domain/combo-sale/entities/combo-sale.entity';
import { ComboSaleRepository } from '../../../domain/combo-sale/repositories/combo-sale.repository';
import { ComboSaleStatus } from '../../../domain/combo-sale/enums/combo-sale-status.enum';
import { CreateComboSaleDto } from '../dto/create-combo-sale.dto';

@Injectable()
export class CreateComboSaleUseCase {

    constructor(
        private readonly repository: ComboSaleRepository,
    ) {}

    async execute(
        dto: CreateComboSaleDto,
    ) {

        const comboSale = new ComboSale(
            randomUUID(),
            dto.comboId,
            dto.totalUnits,
            0,
            ComboSaleStatus.OPEN,
        );

        return this.repository.create(
            comboSale,
        );
    }

}