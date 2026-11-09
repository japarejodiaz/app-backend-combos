import {
    Body,
    Controller,
    Post,
    Version,
    Param,
    Get
} from '@nestjs/common';

import {
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

import { CreateComboSaleUseCase } from '../../../application/combos-sale/use-cases/create-combo-sale.use-case';

import { CreateComboSaleDto } from '../../../application/combos-sale/dto/create-combo-sale.dto';
import { GetComboSaleByIdUseCase }
    from '../../../application/combos-sale/use-cases/get-combo-sale-by-id.use-case';

@ApiTags('Combo Sales')
@Controller('combo-sales')
export class ComboSaleController {

    constructor(
        private readonly createUseCase:
        CreateComboSaleUseCase,
        private readonly getByIdUseCase:
        GetComboSaleByIdUseCase,
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

    @Get(':id')
    @Version('1')
    @ApiOperation({
        summary:
          'Obtener venta de combo',
    })
    findOne(
      @Param('id')
      id: string,
    ) {
        return this.getByIdUseCase.execute(
          id,
        );
    }
}
