import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Combos API')
    .setDescription(
        'Sistema de control de combos, ventas, QR y entregas',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('combo-sales')
    .build();