import {
  Body,
  Controller,
  Post,
  UseGuards,
  Version,
  Get,
  Param,
  Patch,
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
  ApiNotFoundResponse
} from '@nestjs/swagger';

import { CreateUserUseCase } from '../../../application/user/use-cases/create-user.use-case';

import { CreateUserDto } from '../../../application/user/dto/create-user.dto';

import { GetUsersUseCase }
  from '../../../application/user/use-cases/get-users.use-case';
import { GetUserByIdUseCase }
  from '../../../application/user/use-cases/get-user-by-id.use-case';

import { ActivateUserUseCase }
  from '../../../application/user/use-cases/activate-user.use-case';
import { DeactivateUserUseCase }
  from '../../../application/user/use-cases/deactivate-user.use-case';

import { UpdateUserUseCase }
  from '../../../application/user/use-cases/update-user.use-case';

import { UpdateUserDto }
  from '../../../application/user/dto/update-user.dto';

import { UserResponseDto } from './dto/user-response.dto';

import { ErrorResponseDto } from '../../../shared/dto/error-response.dto';

import { JwtAuthGuard } from '../../../infrastructure/security/guards/jwt-auth.guard';

import { RolesGuard } from '../../../infrastructure/security/guards/roles.guard';

import { Roles } from '../../../shared/decorators/roles.decorator';

import { CurrentUser } from '../../../shared/decorators/current-user.decorator';

import { UserRole } from '../../../domain/user/enums/user-role.enum';

@ApiTags('Users')
@Controller('users')
export class UserController {

  constructor(
    private readonly createUserUseCase:
    CreateUserUseCase,
    private readonly getUsersUseCase:
    GetUsersUseCase,
    private readonly getUserByIdUseCase:
    GetUserByIdUseCase,
    private readonly activateUserUseCase:
    ActivateUserUseCase,
    private readonly deactivateUserUseCase:
    DeactivateUserUseCase,
    private readonly updateUserUseCase:
    UpdateUserUseCase,
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
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Crear usuario',
  })

  @ApiCreatedResponse({
    description: 'Usuario creado correctamente',
    type: UserResponseDto,
  })

  @ApiBadRequestResponse({
    description: 'Datos inválidos',
    type: ErrorResponseDto,
  })

  @ApiConflictResponse({
    description: 'Username o email ya existen',
    type: ErrorResponseDto,
  })

  @ApiForbiddenResponse({
    description: 'Rol no permitido',
    type: ErrorResponseDto,
  })

  @ApiUnauthorizedResponse({
    description: 'Usuario no autenticado',
    type: ErrorResponseDto,
  })

  @ApiInternalServerErrorResponse({
    description: 'Error interno',
    type: ErrorResponseDto,
  })

  create(

    @CurrentUser()
    user: any,

    @Body()
    dto: CreateUserDto,

  ) {

    return this.createUserUseCase.execute(
      user,
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
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Listar usuarios',
  })

  @ApiOkResponse({
    type: UserResponseDto,
    isArray: true,
  })

  findAll(

    @CurrentUser()
    user: any,

  ) {

    return this.getUsersUseCase.execute(
      user,
    );

  }

  /**
   * Consultar usuario por ID
   * @param user
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
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Consultar usuario',
  })

  @ApiOkResponse({
    type: UserResponseDto,
  })

  @ApiNotFoundResponse({
    type: ErrorResponseDto,
  })

  findOne(

    @CurrentUser()
    user: any,

    @Param('id')
    id: string,

  ) {

    return this.getUserByIdUseCase.execute(
      user,
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
    UserRole.OWNER,
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Desactivar usuario',
  })

  deactivate(

    @CurrentUser()
    user: any,

    @Param('id')
    id: string,

  ) {

    return this.deactivateUserUseCase.execute(
      user,
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
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Activar usuario',
  })

  activate(

    @CurrentUser()
    user: any,

    @Param('id')
    id: string,

  ) {

    return this.activateUserUseCase.execute(
      user,
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
  )

  @ApiBearerAuth()

  @ApiOperation({
    summary: 'Actualizar usuario',
  })

  @ApiOkResponse({
    description: 'Usuario actualizado',
    type: UserResponseDto,
  })

  @ApiBadRequestResponse({
    type: ErrorResponseDto,
  })

  @ApiConflictResponse({
    description:
      'Username o email ya existen',
    type: ErrorResponseDto,
  })

  @ApiForbiddenResponse({
    description:
      'Rol no permitido',
    type: ErrorResponseDto,
  })

  @ApiUnauthorizedResponse({
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
    dto: UpdateUserDto,

  ) {

    return this.updateUserUseCase.execute(
      currentUser,
      id,
      dto,
    );

  }

}
