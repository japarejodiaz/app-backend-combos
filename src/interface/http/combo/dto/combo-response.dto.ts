import { ApiProperty } from '@nestjs/swagger';

export class ComboResponseDto {

  @ApiProperty()
  id: string;

  @ApiProperty()
  companyId: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty({
    nullable: true,
  })
  description: string | null;

  @ApiProperty()
  active: boolean;

}