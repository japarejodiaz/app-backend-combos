import { ApiProperty } from '@nestjs/swagger';

export class GenerateQrResponseDto {

  @ApiProperty()
  comboSaleId: string;

  @ApiProperty()
  url: string;

  @ApiProperty({
    description: 'QR en base64',
  })
  qr: string;

}