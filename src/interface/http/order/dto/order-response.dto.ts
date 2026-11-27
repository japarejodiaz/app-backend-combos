import { ApiProperty } from '@nestjs/swagger';

export class OrderResponseDto {

  @ApiProperty()
  id: string;

  @ApiProperty()
  companyId: string;

  @ApiProperty({
    nullable: true,
  })
  tableId: string | null;

  @ApiProperty({
    example: 'CMD-000001',
  })
  orderNumber: string;

  @ApiProperty({
    example: 'OPEN',
  })
  status: string;

  @ApiProperty()
  openedBy: string;

  @ApiProperty()
  openedAt: Date;

  @ApiProperty({
    nullable: true,
  })
  closedAt: Date | null;

}