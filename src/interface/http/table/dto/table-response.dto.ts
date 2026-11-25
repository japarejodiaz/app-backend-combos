import { ApiProperty } from '@nestjs/swagger';

export class TableResponseDto {

  @ApiProperty()
  id: string;

  @ApiProperty()
  companyId: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  active: boolean;

}