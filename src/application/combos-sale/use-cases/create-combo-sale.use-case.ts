import { Injectable } from '@nestjs/common';

import { randomUUID } from 'crypto';
import { ComboSale } from '../../../domain/combo-sale/entities/combo-sale.entity';
import { ComboSaleRepository } from '../../../domain/combo-sale/repositories/combo-sale.repository';
import { ComboSaleStatus } from '../../../domain/combo-sale/enums/combo-sale-status.enum';
import { CreateComboSaleDto } from '../dto/create-combo-sale.dto';
import { UseGuards } from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard }
    from '../../../infrastructure/security/guards/jwt-auth.guard';

import { CurrentUser }
    from '../../../shared/decorators/current-user.decorator';

@Injectable()
export class CreateComboSaleUseCase {

    constructor(
        private readonly repository: ComboSaleRepository,
    ) {}

    async execute(
      companyId: string,
        dto: CreateComboSaleDto,
    ) {

        const comboSale = new ComboSale(
            randomUUID(),
            companyId,
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