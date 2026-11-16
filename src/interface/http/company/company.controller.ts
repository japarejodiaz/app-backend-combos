import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Version,
  Param,
  Patch
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
  ApiOkResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';

import { CreateCompanyUseCase } from '../../../application/company/use-cases/create-company.use-case';
import { GetCompaniesUseCase } from '../../../application/company/use-cases/get-companies.use-case';
import { GetCompanyByIdUseCase }
  from '../../../application/company/use-cases/get-company-by-id.use-case';
import { DeactivateCompanyUseCase }
  from '../../../application/company/use-cases/deactivate-company.use-case';
import { ActivateCompanyUseCase }
  from '../../../application/company/use-cases/activate-company.use-case';


import { CreateCompanyDto } from '../../../application/company/dto/create-company.dto';

import { CompanyResponseDto } from './dto/company-response.dto';

import { ErrorResponseDto } from '../../../shared/dto/error-response.dto';

import { JwtAuthGuard } from '../../../infrastructure/security/guards/jwt-auth.guard';

import { RolesGuard } from '../../../infrastructure/security/guards/roles.guard';

import { Roles } from '../../../shared/decorators/roles.decorator';

import { UserRole } from '../../../domain/user/enums/user-role.enum';


@ApiTags('Companies')
@Controller('companies')
export class CompanyController {

  constructor(
    private readonly createCompanyUseCase:
    CreateCompanyUseCase,
    private readonly getCompaniesUseCase:
    GetCompaniesUseCase,
    private readonly getCompanyByIdUseCase:
    GetCompanyByIdUseCase,
    private readonly deactivateCompanyUseCase:
    DeactivateCompanyUseCase,
    private readonly activateCompanyUseCase:
    ActivateCompanyUseCase,
  ) {}

  @Post()
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.SUPER_ADMIN,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Crear empresa',
  })

  @ApiCreatedResponse({
    type: CompanyResponseDto,
  })

  @ApiBadRequestResponse({
    type: ErrorResponseDto,
  })

  @ApiConflictResponse({
    description: 'Código ya existe',
    type: ErrorResponseDto,
  })

  @ApiForbiddenResponse({
    description:
      'No autorizado por rol',
    type: ErrorResponseDto,
  })

  @ApiInternalServerErrorResponse({
    type: ErrorResponseDto,
  })

  create(
    @Body()
    dto: CreateCompanyDto,
  ) {

    return this.createCompanyUseCase.execute(
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
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Listar empresas',
  })

  @ApiOkResponse({
    type: CompanyResponseDto,
    isArray: true,
  })

  @ApiForbiddenResponse({
    type: ErrorResponseDto,
  })

  @ApiInternalServerErrorResponse({
    type: ErrorResponseDto,
  })

  findAll() {

    return this.getCompaniesUseCase.execute();

  }

  @Get(':id')
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.SUPER_ADMIN,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Obtener empresa por ID',
  })

  @ApiOkResponse({
    type: CompanyResponseDto,
  })

  @ApiNotFoundResponse({
    type: ErrorResponseDto,
  })

  @ApiForbiddenResponse({
    type: ErrorResponseDto,
  })

  @ApiInternalServerErrorResponse({
    type: ErrorResponseDto,
  })

  findOne(
    @Param('id') id: string,
  ) {

    return this.getCompanyByIdUseCase.execute(
      id,
    );

  }

  @Patch(':id/deactivate')
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.SUPER_ADMIN,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Desactivar empresa',
  })

  @ApiOkResponse({
    description: 'Empresa desactivada',
    type: CompanyResponseDto,
  })

  @ApiNotFoundResponse({
    type: ErrorResponseDto,
  })

  @ApiForbiddenResponse({
    type: ErrorResponseDto,
  })

  @ApiInternalServerErrorResponse({
    type: ErrorResponseDto,
  })

  deactivate(
    @Param('id')
    id: string,
  ) {

    return this.deactivateCompanyUseCase.execute(
      id,
    );

  }

  @Patch(':id/activate')
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.SUPER_ADMIN,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Activar empresa',
  })

  @ApiOkResponse({
    description: 'Empresa activada',
    type: CompanyResponseDto,
  })

  @ApiNotFoundResponse({
    type: ErrorResponseDto,
  })

  @ApiForbiddenResponse({
    type: ErrorResponseDto,
  })

  @ApiInternalServerErrorResponse({
    type: ErrorResponseDto,
  })

  activate(
    @Param('id')
    id: string,
  ) {

    return this.activateCompanyUseCase.execute(
      id,
    );

  }

}