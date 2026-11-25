import {
  ApiProperty,
} from '@nestjs/swagger';

import {
  IsInt,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateTableDto {

  @ApiProperty({
    example: 'M01',
  })
  @IsString()
  @Length(1, 20)
  code: string;

  @ApiProperty({
    example: 'Mesa Principal',
  })
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    example: 6,
  })
  @IsInt()
  @IsPositive()
  capacity: number;

}