import {
    Body,
    Controller,
    Post,
    Version,
    Param,
    Get,
    Res,
    Logger,
} from '@nestjs/common';

import {
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
    ApiNotFoundResponse,
    ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import type { Response } from 'express';

/** CAsos de uso -srvicios **/
import { CreateComboSaleUseCase } from '../../../application/combos-sale/use-cases/create-combo-sale.use-case';
import { CreateComboSaleDto } from '../../../application/combos-sale/dto/create-combo-sale.dto';
import { GetComboSaleByIdUseCase } from '../../../application/combos-sale/use-cases/get-combo-sale-by-id.use-case';
import { DeliverUnitsUseCase } from '../../../application/combos-sale/use-cases/deliver-units.use-case';
import { GetDeliveriesByComboSaleUseCase } from '../../../application/combos-sale/use-cases/get-deliveries-by-combo-sale.use-case';
import { GenerateQrUseCase } from '../../../application/combos-sale/use-cases/qr/generate-qr.use-case';

import { DeliverUnitsDto } from '../../../interface/http/combo-sale/dto/deliver-units.dto';
import { ComboSaleResponseDto } from '../../../interface/http/combo-sale/dto/combo-sale-response.dto';
import { ErrorResponseDto } from '../../../shared/dto/error-response.dto';
import { DeliveryLogResponseDto } from '../../../interface/http/combo-sale/dto/delivery-log-response.dto';
import { GenerateQrResponseDto } from '../../../interface/http/combo-sale/dto/generate-qr-response.dto';

import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/security/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';

@ApiTags('Combo Sales')
@Controller('combo-sales')
export class ComboSaleController {

    private readonly logger = new Logger(ComboSaleController.name);

    constructor(
        private readonly createUseCase:
        CreateComboSaleUseCase,
        private readonly getByIdUseCase:
        GetComboSaleByIdUseCase,
        private readonly deliverUnitsUseCase:
        DeliverUnitsUseCase,
        private readonly getDeliveriesUseCase:
        GetDeliveriesByComboSaleUseCase,
        private readonly generateQrUseCase:
        GenerateQrUseCase,

    ) {}

    /**
     * Crea una nueva venta de combo
     * @param dto
     */
    @Post()
    @Version('1')
    @ApiOperation({
        summary: 'Crear venta de combo',
    })

    @ApiCreatedResponse({
        description: 'Venta creada correctamente',
        type: ComboSaleResponseDto,
    })

    @ApiBadRequestResponse({
        description: 'Datos inválidos',
        type: ErrorResponseDto,
    })

    @ApiUnauthorizedResponse({
        description: 'Usuario no autorizado',
        type: ErrorResponseDto,
    })

    @ApiInternalServerErrorResponse({
        description: 'Error interno',
        type: ErrorResponseDto,
    })

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()

    create(
      @CurrentUser() user: any,

      @Body()
      dto: CreateComboSaleDto,
    ) {

        this.logger.log('USER JWT => ', user);

        return this.createUseCase.execute(user.companyId, dto);
    }


    /**
     * Consulta una venta de combo por su ID
     * @param id
     */
    @Get(':id')
    @Version('1')
    @ApiOperation({
        summary: 'Consultar una venta de combo',
    })

    @ApiOkResponse({
        description: 'Venta encontrada',
        type: ComboSaleResponseDto,
    })

    @ApiBadRequestResponse({
        description: 'UUID inválido',
        type: ErrorResponseDto,
    })

    @ApiNotFoundResponse({
        description: 'Venta no encontrada',
        type: ErrorResponseDto,
    })

    @ApiUnauthorizedResponse({
        description: 'Usuario no autorizado',
        type: ErrorResponseDto,
    })

    @ApiInternalServerErrorResponse({
        description: 'Error interno',
        type: ErrorResponseDto,
    })

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()

    findOne(
      @CurrentUser() user: any,
      @Param('id')
      id: string,
    ) {
        this.logger.log('USER JWT => ', user);
        return this.getByIdUseCase.execute(user.companyId, id);
    }


    /**
     * Entrega unidades de un combo
     * @param id
     * @param dto
     */
    @Post(':id/deliver')
    @Version('1')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Entregar unidades de un combo',
        description:
          'Registra la entrega parcial o total de unidades asociadas a una venta de combo.',
    })

    @ApiParam({
        name: 'id',
        description: 'Identificador de la venta del combo',
        example: '8a3ae06c-8b37-4f60-81c3-b699ff59ac3a',
    })

    @ApiOkResponse({
        description: 'Entrega realizada correctamente',
        type: ComboSaleResponseDto,
    })

    @ApiBadRequestResponse({
        description:
          'La cantidad solicitada es inválida, excede las unidades disponibles o el combo ya fue cerrado',
        type: ErrorResponseDto,
    })

    @ApiNotFoundResponse({
        description: 'La venta del combo no existe',
        type: ErrorResponseDto,
    })

    @ApiUnauthorizedResponse({
        description: 'Usuario no autorizado',
        type: ErrorResponseDto,
    })

    @ApiInternalServerErrorResponse({
        description: 'Error interno del servidor',
        type: ErrorResponseDto,
    })

    deliver(
      @CurrentUser() user: any,
      @Param('id')
      id: string,

      @Body()
      dto: DeliverUnitsDto,
    ) {
                return this.deliverUnitsUseCase.execute(
          user.companyId,
          id,
          dto.units,
        );
    }

    /**
     * Consulta el historial de entregas de una venta de combo
     * @param id
     */

    @Get(':id/deliveries')
    @Version('1')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Consultar historial de entregas',
    })

    @ApiParam({
        name: 'id',
        description: 'ID de la venta',
    })

    @ApiOkResponse({
        description: 'Historial encontrado',
        type: DeliveryLogResponseDto,
        isArray: true,
    })

    @ApiBadRequestResponse({
        description: 'Solicitud inválida',
        type: ErrorResponseDto,
    })

    @ApiNotFoundResponse({
        description: 'Combo no encontrado',
        type: ErrorResponseDto,
    })

    @ApiUnauthorizedResponse({
        description: 'No autorizado',
        type: ErrorResponseDto,
    })

    @ApiInternalServerErrorResponse({
        description: 'Error interno',
        type: ErrorResponseDto,
    })

    findDeliveries(
      @CurrentUser() user: any,
      @Param('id')
      id: string,
    ) {

        return this.getDeliveriesUseCase.execute(
          user.companyId,
          id,
        );
    }

    /**
     * Genera un código QR para una venta de combo
     * @param id
     */
    @Post(':id/generate-qr')
    @Version('1')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Generar QR para una venta',
    })

    @ApiParam({
        name: 'id',
        description: 'ID de la venta',
    })

    @ApiOkResponse({
        description: 'QR generado correctamente',
        type: GenerateQrResponseDto,
    })

    @ApiBadRequestResponse({
        description: 'Solicitud inválida',
        type: ErrorResponseDto,
    })

    @ApiNotFoundResponse({
        description: 'Venta no encontrada',
        type: ErrorResponseDto,
    })

    @ApiUnauthorizedResponse({
        description: 'Usuario no autorizado',
        type: ErrorResponseDto,
    })

    @ApiInternalServerErrorResponse({
        description: 'Error interno',
        type: ErrorResponseDto,
    })

    generateQr(
      @Param('id')
      id: string,
    ) {

        return this.generateQrUseCase.execute(
          id,
        );

    }


    /**
     * Visualiza el código QR de una venta de combo
     * @param id
     * @param res
     */

    @Get(':id/qr')
    @Version('1')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()

    @ApiOperation({
        summary: 'Visualizar QR de una venta',
    })

    @ApiParam({
        name: 'id',
        description: 'ID de la venta',
    })

    @ApiOkResponse({
        description: 'Imagen PNG del QR',
    })

    @ApiNotFoundResponse({
        description: 'Venta no encontrada',
        type: ErrorResponseDto,
    })

    @ApiInternalServerErrorResponse({
        description: 'Error interno',
        type: ErrorResponseDto,
    })

    async viewQr(
      @Param('id')
      id: string,

      @Res()
      res: Response,
    ) {
        const result =
          await this.generateQrUseCase.execute(id);

        const base64 =
          result.qr.replace(
            /^data:image\/png;base64,/,
            '',
          );

        const imageBuffer =
          Buffer.from(
            base64,
            'base64',
          );

        res.setHeader(
          'Content-Type',
          'image/png',
        );

        return res.send(imageBuffer);
    }
}