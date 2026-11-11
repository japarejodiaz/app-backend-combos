import { ApiProperty } from '@nestjs/swagger';

export class ComboSaleResponseDto {

  @ApiProperty({
    example: '8a3ae06c-8b37-4f60-81c3-b699ff59ac3a',
  })
  id: string;

  @ApiProperty({
    example: '8a3ae06c-8b37-4f60-81c3-b699ff59ac3a',
  })
  companyId: string;

  @ApiProperty({
    example: '95cba18d-7775-4895-a564-f06057f8d4df',
  })
  comboId: string;

  @ApiProperty({
    example: 12,
  })
  totalUnits: number;

  @ApiProperty({
    example: 0,
  })
  deliveredUnits: number;

  @ApiProperty({
    example: 12,
  })
  pendingUnits: number;

  @ApiProperty({
    example: 'OPEN',
  })
  status: string;
}