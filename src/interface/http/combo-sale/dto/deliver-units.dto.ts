import {
  ApiProperty
} from '@nestjs/swagger';

import {
  IsInt,
  Min
} from 'class-validator';

export class DeliverUnitsDto {

  @ApiProperty({
    example: 2
  })
  @IsInt()
  @Min(1)
  units: number;

}