import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Version,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { CreateTableUseCase }
  from '../../../application/table/use-cases/create-table.use-case';
import { GetTablesUseCase }
  from '../../../application/table/use-cases/get-tables.use-case';
import { GetTableByIdUseCase }
  from '../../../application/table/use-cases/get-table-by-id.use-case';
import { GetTableByCodeUseCase }
  from '../../../application/table/use-cases/get-table-by-code.use-case';

import { CreateTableDto }
  from '../../../application/table/dto/create-table.dto';

import { TableResponseDto }
  from './dto/table-response.dto';

import { ErrorResponseDto }
  from '../../../shared/dto/error-response.dto';

import { JwtAuthGuard }
  from '../../../infrastructure/security/guards/jwt-auth.guard';

import { RolesGuard }
  from '../../../infrastructure/security/guards/roles.guard';

import { Roles }
  from '../../../shared/decorators/roles.decorator';

import { CurrentUser }
  from '../../../shared/decorators/current-user.decorator';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

@ApiTags('Tables')
@Controller('tables')
export class TableController {

  constructor(
    private readonly createTableUseCase:
    CreateTableUseCase,
    private readonly getTablesUseCase:
    GetTablesUseCase,
    private readonly getTableByIdUseCase:
    GetTableByIdUseCase,
    private readonly getTableByCodeUseCase:
    GetTableByCodeUseCase,
  ) {}

  @Post()
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
    summary: 'Crear mesa',
  })

  @ApiCreatedResponse({
    description: 'Mesa creada',
    type: TableResponseDto,
  })

  @ApiBadRequestResponse({
    type: ErrorResponseDto,
  })

  @ApiConflictResponse({
    description:
      'Código de mesa duplicado',
    type: ErrorResponseDto,
  })

  @ApiForbiddenResponse({
    type: ErrorResponseDto,
  })

  @ApiUnauthorizedResponse({
    type: ErrorResponseDto,
  })

  @ApiInternalServerErrorResponse({
    type: ErrorResponseDto,
  })

  create(

    @CurrentUser()
    currentUser: any,

    @Body()
    dto: CreateTableDto,

  ) {

    return this.createTableUseCase.execute(
      currentUser,
      dto,
    );

  }

  @Get()
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.OWNER,
    UserRole.MANAGER,
    UserRole.CASHIER,
    UserRole.WAITER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Listar mesas',
  })

  @ApiOkResponse({
    type: TableResponseDto,
    isArray: true,
  })

  findAll(

    @CurrentUser()
    currentUser: any,

  ) {

    return this.getTablesUseCase.execute(
      currentUser,
    );

  }

  @Get('code/:code')
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.OWNER,
    UserRole.MANAGER,
    UserRole.CASHIER,
    UserRole.WAITER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Consultar mesa por código',
  })

  @ApiOkResponse({
    type: TableResponseDto,
  })

  @ApiNotFoundResponse({
    type: ErrorResponseDto,
  })

  findByCode(

    @CurrentUser()
    currentUser: any,

    @Param('code')
    code: string,

  ) {

    return this.getTableByCodeUseCase.execute(
      currentUser,
      code,
    );

  }


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
    UserRole.CASHIER,
    UserRole.WAITER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Consultar mesa',
  })

  @ApiOkResponse({
    type: TableResponseDto,
  })

  @ApiNotFoundResponse({
    type: ErrorResponseDto,
  })

  findOne(

    @CurrentUser()
    currentUser: any,

    @Param('id')
    id: string,

  ) {

    return this.getTableByIdUseCase.execute(
      currentUser,
      id,
    );

  }




}