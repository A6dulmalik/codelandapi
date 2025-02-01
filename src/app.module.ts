import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entity/user.entity';
import { Post } from './post/post.entity';
import { TagModule } from './tag/tag.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DataResponseTsInterceptor } from './common/interceptors/data-response/data-response.ts.interceptor';
import { MailModule } from './mail/mail.module';
import { AuthTokenGuard } from './auth/guard/authentication/auth-token.guard';
import { AccessTokenGuard } from './auth/guard/access-token/access-token.guard';
import { JwtModule } from '@nestjs/jwt';
import { PaginationModule } from './common/pagination.module';
import jwtConfig from './auth/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
    PostModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        synchronize: configService.get('DATABASE_SYNC'),
        autoLoadEntities: configService.get('DATABASE_LOAD'),
      }),
    }),
    TagModule,
    MetaOptionsModule,
    AuthModule,
    MailModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthTokenGuard,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: DataResponseTsInterceptor,
    // },
    // AccessTokenGuard,
  ],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
