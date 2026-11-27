import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {

  @ApiPropertyOptional({
    description:
      'Mesa asociada a la comanda',
  })
  @IsOptional()
  @IsUUID()
  tableId?: string;

}
