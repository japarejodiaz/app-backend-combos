import {

  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  UseGuards,
  Version,

} from '@nestjs/common';

import {

  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,

} from '@nestjs/swagger';

import { ComboResponseDto }
  from './dto/combo-response.dto';

import { CreateComboDto }
  from '../../../application/combo/dto/create-combo.dto';
import { UpdateComboDto }
  from '../../../application/combo/dto/update-combo.dto';

import { CreateComboUseCase }
  from '../../../application/combo/use-cases/create-combo.use-case';
import { GetCombosUseCase }
  from '../../../application/combo/use-cases/get-combos.use-case';
import { GetComboByIdUseCase }
  from '../../../application/combo/use-cases/get-combo-by-id.use-case';
import { UpdateComboUseCase }
  from '../../../application/combo/use-cases/update-combo.use-case';
import { DeactivateComboUseCase }
  from '../../../application/combo/use-cases/deactivate-combo.use-case';
import { ActivateComboUseCase }
  from '../../../application/combo/use-cases/activate-combo.use-case';

import { CurrentUser }
  from '../../../shared/decorators/current-user.decorator';

import { Roles }
  from '../../../shared/decorators/roles.decorator';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

import { JwtAuthGuard }
  from '../../../infrastructure/security/guards/jwt-auth.guard';

import { RolesGuard }
  from '../../../infrastructure/security/guards/roles.guard';
import { ErrorResponseDto } from '../../../shared/dto/error-response.dto';

@ApiTags('Combos')
@Controller('combos')
export class ComboController {

  constructor(

    private readonly createComboUseCase:
    CreateComboUseCase,
    private readonly getCombosUseCase:
    GetCombosUseCase,

    private readonly getComboByIdUseCase:
    GetComboByIdUseCase,
    private readonly updateComboUseCase:
    UpdateComboUseCase,
    private readonly deactivateComboUseCase:
    DeactivateComboUseCase,
    private readonly activateComboUseCase:
    ActivateComboUseCase,

  ) {}

  @Post()
  @Version('1')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    UserRole.OWNER,
    UserRole.MANAGER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary:
      'Crear combo',
  })

  @ApiCreatedResponse({
    type: ComboResponseDto,
  })

  @ApiConflictResponse()

  create(

    @CurrentUser()
    currentUser: any,

    @Body()
    dto: CreateComboDto,

  ) {

    return this.createComboUseCase.execute(
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
    UserRole.WAITER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Obtener combos',
  })

  @ApiOkResponse({
    type: ComboResponseDto,
    isArray: true,
  })

  findAll(

    @CurrentUser()
    currentUser: any,

  ) {

    return this.getCombosUseCase.execute(
      currentUser,
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
    UserRole.WAITER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Obtener combo',
  })

  @ApiOkResponse({
    type: ComboResponseDto,
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

    return this.getComboByIdUseCase.execute(
      currentUser,
      id,
    );

  }

  @Patch(':id')
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
    summary: 'Actualizar combo',
  })

  @ApiOkResponse({
    description: 'Combo actualizado',
    type: ComboResponseDto,
  })

  @ApiConflictResponse({
    type: ErrorResponseDto,
  })

  @ApiNotFoundResponse({
    type: ErrorResponseDto,
  })

  update(

    @CurrentUser()
    currentUser: any,

    @Param('id')
    id: string,

    @Body()
    dto: UpdateComboDto,

  ) {

    return this.updateComboUseCase.execute(
      currentUser,
      id,
      dto,
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
    UserRole.OWNER,
    UserRole.MANAGER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Desactivar combo',
  })

  @ApiOkResponse({
    description: 'Combo desactivado',
    type: ComboResponseDto,
  })

  @ApiNotFoundResponse({
    type: ErrorResponseDto,
  })

  deactivate(

    @CurrentUser()
    currentUser: any,

    @Param('id')
    id: string,

  ) {

    return this.deactivateComboUseCase.execute(
      currentUser,
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
    UserRole.OWNER,
    UserRole.MANAGER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Activar combo',
  })

  @ApiOkResponse({
    description: 'Combo activado',
    type: ComboResponseDto,
  })

  @ApiNotFoundResponse({
    type: ErrorResponseDto,
  })

    activate(

      @CurrentUser()
    currentUser: any,

    @Param('id')
    id: string,

  ) {

      return this.activateComboUseCase.execute(
        currentUser,
        id,
      );

    }





}