import {
  ApiProperty,
} from '@nestjs/swagger';

import {
  IsString,
  Length,
} from 'class-validator';

export class CreateCompanyDto {

  @ApiProperty({
    example: 'BAR001',
  })
  @IsString()
  @Length(3, 20)
  code: string;

  @ApiProperty({
    example: 'Bar Premium',
  })
  @IsString()
  @Length(3, 150)
  name: string;

}