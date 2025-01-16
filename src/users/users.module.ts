/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/user.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneByEmail } from './providers/find-one-by-email';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { AccessTokenGuard } from 'src/auth/guard/access-token/access-token.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]), 
    forwardRef(()=> AuthModule), 
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  controllers: [UsersController],
  providers: [UserService, CreateUserProvider, FindOneByEmail,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    }
  ],
  exports: [ TypeOrmModule, UserService],
})
export class UsersModule {}
