import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class UpdateTableDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 20)
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsPositive()
  capacity?: number;

}