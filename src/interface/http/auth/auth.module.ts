import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';

import { JwtStrategy }
  from '../../../infrastructure/security/jwt/jwt.strategy';

import { AuthController } from './auth.controller';
import { LoginUseCase } from '../../../application/auth/use-cases/login.use-case';
import { PasswordService } from '../../../infrastructure/security/services/password.service';
import { UserRepository } from '../../../domain/user/repositories/user.repository';
import { UserOrmEntity } from '../../../infrastructure/persistence/postgres/entities/user.orm-entity';
import { PostgresUserRepository } from '../../../infrastructure/persistence/postgres/repositories/user.postgres.repository';

@Module({
  imports: [

    ConfigModule,

    TypeOrmModule.forFeature([
      UserOrmEntity,
    ]),

    JwtModule.registerAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ) => ({
        secret:
          configService.get<string>(
            'auth.jwtSecret',
          ),

        signOptions: {
          expiresIn:
            configService.get<string>(
              'auth.jwtExpiresIn',
            ) as any,
        },
      }),
    }),

  ],

  controllers: [
    AuthController,
  ],

  providers: [

    PasswordService,
    LoginUseCase,
    JwtStrategy,

    {
      provide: UserRepository,
      useClass:
      PostgresUserRepository,
    },

  ],

  exports: [
    JwtModule,
    PasswordService,
    UserRepository,
  ],

})
export class AuthModule {}