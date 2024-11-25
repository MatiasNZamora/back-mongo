import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { OperadoresModule } from 'src/operadores/operadores.module';
import { LocalStrategy } from './strategies/local.strategy';

import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

import config from 'src/config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports:[
    OperadoresModule, 
    PassportModule, 
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d', // tiempo de expiracion de los token en dias.
          }
        };
      }
    })
  ],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy,
  ],
  controllers:[AuthController]
})
export class AuthModule {}
