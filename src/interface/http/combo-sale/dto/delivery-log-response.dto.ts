import { ApiProperty } from '@nestjs/swagger';

export class DeliveryLogResponseDto {

  @ApiProperty({
    example: 'd84f974f-f912-4d89-b9f1-16459b93ab57',
  })
  id: string;

  @ApiProperty({
    example: '8a3ae06c-8b37-4f60-81c3-b699ff59ac3a',
  })
  comboSaleId: string;

  @ApiProperty({
    example: 2,
  })
  units: number;

  @ApiProperty({
    example: '2026-10-21T20:15:00.000Z',
  })
  createdAt: Date;
}