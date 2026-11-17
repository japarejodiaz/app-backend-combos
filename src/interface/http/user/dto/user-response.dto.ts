import { ApiProperty }
  from '@nestjs/swagger';

export class UserResponseDto {

  @ApiProperty()
  id: string;

  @ApiProperty()
  companyId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  active: boolean;

}