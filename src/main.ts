import {NestFactory} from '@nestjs/core';
import {
    VersioningType,
    ValidationPipe,
    Logger,
} from '@nestjs/common';

import {
    SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import {AppModule} from './app.module';
import {swaggerConfig} from './infrastructure/config/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    const logger = new Logger('Bootstrap');

    const port = configService.get<number>('app.port') || 3000;

    app.enableVersioning({
        type: VersioningType.URI,
    });

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
            stopAtFirstError: true,
        }),
    );

    const document =
        SwaggerModule.createDocument(
            app,
            swaggerConfig,
        );

    SwaggerModule.setup(
        'swagger',
        app,
        document,
    );

    await app.listen(process.env.PORT ?? 3000);

    logger.log('=================================');
    logger.log(`🚀 APP        : ${configService.get('app.name')}`);
    logger.log(`🌍 ENV        : ${configService.get('app.env')}`);
    logger.log(`🔌 PORT       : ${port}`);

    logger.log(
        `📚 SWAGGER    : http://localhost:${port}/swagger`,
    );

    logger.log(
        `📡 API        : http://localhost:${port}/api/v1`,
    );

    logger.log(
        `🐘 POSTGRES   : ${configService.get('database.host')}:${configService.get('database.port')}`,
    );

    logger.log(
        `🗄️ DATABASE   : ${configService.get('database.database')}`,
    );

    logger.log(
        `🌍 ENV        : ${configService.get('app.env')}`,
    );

    logger.log('=================================');
}

bootstrap();
