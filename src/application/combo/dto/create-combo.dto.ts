import {
  ApiProperty,
} from '@nestjs/swagger';

import {

  IsNotEmpty,

  IsOptional,

  IsString,

  Length,

} from 'class-validator';

export class CreateComboDto {

  @ApiProperty({
    example: 'CB001',
  })
  @IsString()
  @Length(1, 20)
  code: string;

  @ApiProperty({
    example: 'Tobo 10 Cervezas',
  })
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  description?: string;

}