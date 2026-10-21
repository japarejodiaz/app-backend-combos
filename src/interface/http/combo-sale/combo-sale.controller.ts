import {
    Body,
    Controller,
    Post,
    Version,
} from '@nestjs/common';

import {
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

import { CreateComboSaleUseCase } from '../../../application/combos-sale/use-cases/create-combo-sale.use-case';

import { CreateComboSaleDto } from '../../../application/combos-sale/dto/create-combo-sale.dto';

@ApiTags('Combo Sales')
@Controller('combo-sales')
export class ComboSaleController {

    constructor(
        private readonly createUseCase:
        CreateComboSaleUseCase,
    ) {}

    @Post()
    @Version('1')

    @ApiOperation({
        summary:
            'Crear venta de combo',
    })
    create(
        @Body()
        dto: CreateComboSaleDto,
    ) {

        return this.createUseCase.execute(
            dto,
        );
    }
}
