import { Body, Controller, Get, Post, Patch, Param, UseGuards, Version } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam

} from '@nestjs/swagger';

import { CreateOrderUseCase } from '../../../application/order/use-cases/create-order.use-case';

import { CreateOrderDto } from '../../../application/order/dto/create-order.dto';

import { GetOrdersUseCase } from '../../../application/order/use-cases/get-orders.use-case';

import { GetOrderByNumberUseCase }
  from '../../../application/order/use-cases/get-order-by-number.use-case';

import { GetOrderByIdUseCase }
  from '../../../application/order/use-cases/get-order-by-id.use-case';
import { CloseOrderUseCase } from '../../../application/order/use-cases/close-order.use-case';
import { CancelOrderUseCase } from '../../../application/order/use-cases/cancel-order.use-case';
import { CreateOrderComboSaleUseCase } from '../../../application/combos-sale/use-cases/create-order-combo-sale.use-case';

import { CreateComboSaleDto } from '../../../application/combos-sale/dto/create-combo-sale.dto';

import { OrderResponseDto } from './dto/order-response.dto';

import { ErrorResponseDto } from '../../../shared/dto/error-response.dto';

import { JwtAuthGuard } from '../../../infrastructure/security/guards/jwt-auth.guard';

import { RolesGuard } from '../../../infrastructure/security/guards/roles.guard';

import { CurrentUser } from '../../../shared/decorators/current-user.decorator';

import { Roles } from '../../../shared/decorators/roles.decorator';

import { UserRole } from '../../../domain/user/enums/user-role.enum';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {

  constructor(
    private readonly createOrderUseCase:
    CreateOrderUseCase,
    private readonly getOrdersUseCase:
    GetOrdersUseCase,
    private readonly getOrderByNumberUseCase:
    GetOrderByNumberUseCase,
    private readonly getOrderByIdUseCase:
    GetOrderByIdUseCase,
    private readonly closeOrderUseCase:
    CloseOrderUseCase,
    private readonly cancelOrderUseCase:
    CancelOrderUseCase,
    private readonly createOrderComboSaleUseCase:
    CreateOrderComboSaleUseCase,
  ) {}

  /**
   * Crear una nueva comanda
   * @param currentUser
   * @param dto
   */

  @Post()
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.OWNER,
    UserRole.MANAGER,
    UserRole.WAITER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Abrir comanda',
  })

  @ApiCreatedResponse({
    type: OrderResponseDto,
  })

  @ApiBadRequestResponse()

  @ApiConflictResponse()

  create(

    @CurrentUser()
    currentUser: any,

    @Body()
    dto: CreateOrderDto,

  ) {

    return this.createOrderUseCase.execute(
      currentUser,
      dto,
    );

  }

  /**
   * Obtener todas las comandas
   * @param currentUser
   */

  @Get()
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles
  (
    UserRole.SUPER_ADMIN,
    UserRole.OWNER,
    UserRole.MANAGER,
    UserRole.WAITER,
  )
  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Obtener comandas',
  })

  @ApiCreatedResponse({
    type: OrderResponseDto,
    isArray: true,
  })

  findAll(
    @CurrentUser()
    currentUser: any,

  ) {

    return this.getOrdersUseCase.execute(
      currentUser,
    );

  }

  /**
   * Obtener comanda por número
   * @param currentUser
   * @param orderNumber
   */

  @Get('number/:orderNumber')
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.OWNER,
    UserRole.MANAGER,
    UserRole.WAITER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Obtener comanda por número',
  })

  @ApiOkResponse({
    type: OrderResponseDto,
  })

  findByNumber(

    @CurrentUser()
    currentUser: any,

    @Param('orderNumber')
    orderNumber: string,

  ) {

    return this.getOrderByNumberUseCase.execute(
      currentUser,
      orderNumber,
    );

  }

  /**
   * Obtener comanda por ID
   * @param currentUser
   * @param id
   */

  @Get(':id')
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.OWNER,
    UserRole.MANAGER,
    UserRole.WAITER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Consultar comanda',
  })

  @ApiOkResponse({
    type: OrderResponseDto,
  })

  @ApiNotFoundResponse({
    type: ErrorResponseDto,
  })

  findById(

    @CurrentUser()
    currentUser: any,

    @Param('id')
    id: string,

  ) {

    return this.getOrderByIdUseCase.execute(
      currentUser,
      id,
    );

  }

  /**
   * Cerrar comanda
   * @param currentUser
   * @param id
   */

  @Patch(':id/close')
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.OWNER,
    UserRole.MANAGER,
    UserRole.WAITER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Cerrar comanda',
  })

  @ApiOkResponse({
    description: 'Comanda cerrada',
    type: OrderResponseDto,
  })

  @ApiNotFoundResponse({
    type: ErrorResponseDto,
  })

  @ApiConflictResponse({
    type: ErrorResponseDto,
  })

  close(

    @CurrentUser()
    currentUser: any,

    @Param('id')
    id: string,

  ) {

    return this.closeOrderUseCase.execute(
      currentUser,
      id,
    );

  }

  /**
   * Cancelar comanda
   * @param currentUser
   * @param id
   */

  @Patch(':id/cancel')
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.OWNER,
    UserRole.MANAGER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Cancelar comanda',
  })

  @ApiOkResponse({
    description: 'Comanda cancelada',
    type: OrderResponseDto,
  })

  @ApiNotFoundResponse({
    type: ErrorResponseDto,
  })

  @ApiConflictResponse({
    type: ErrorResponseDto,
  })

  cancel(

    @CurrentUser()
    currentUser: any,

    @Param('id')
    id: string,

  ) {

    return this.cancelOrderUseCase.execute(
      currentUser,
      id,
    );

  }

  /**
   * Agregar venta a una comanda
   * @param currentUser
   * @param id
   * @param dto
   */

  @Post(':id/combo-sales')
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.OWNER,
    UserRole.MANAGER,
    UserRole.WAITER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary:
      'Agregar venta a una comanda',
  })

  @ApiCreatedResponse()

  @ApiConflictResponse()

  @ApiNotFoundResponse()

  createComboSale(

    @CurrentUser()
    currentUser: any,

    @Param('id')
    id: string,

    @Body()
    dto: CreateComboSaleDto,

  ) {

    return this.createOrderComboSaleUseCase
      .execute(
        currentUser,
        id,
        dto,
      );

  }

}