import {
  ApiProperty,
} from '@nestjs/swagger';

import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
} from 'class-validator';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

export class CreateUserDto {

  @ApiProperty({
    example: 'cajero1',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'cajero1@empresa.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Cajero123!',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role: UserRole;

}