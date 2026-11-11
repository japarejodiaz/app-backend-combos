import {
  Body,
  Controller,
  Post,
  Version,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

import { LoginUseCase }
  from '../../../application/auth/use-cases/login.use-case';

import { LoginDto }
  from '../../../application/auth/dto/login.dto';

import { LoginResponseDto }
  from '../../../application/auth/dto/login-response.dto';

import { ErrorResponseDto }
  from '../../../shared/dto/error-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly loginUseCase:
    LoginUseCase,
  ) {}

  @Post('login')
  @Version('1')

  @ApiOperation({
    summary: 'Login',
  })

  @ApiOkResponse({
    type: LoginResponseDto,
  })

  @ApiBadRequestResponse({
    type: ErrorResponseDto,
  })

  @ApiUnauthorizedResponse({
    type: ErrorResponseDto,
  })

  @ApiInternalServerErrorResponse({
    type: ErrorResponseDto,
  })

  login(
    @Body()
    dto: LoginDto,
  ) {

    return this.loginUseCase.execute(
      dto,
    );

  }

}