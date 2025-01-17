import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { UsersController } from './users/users.controller';
// import { UsersController } from './users/users.controller';
// import { PorpertiesModule } from './porperties/porperties.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entity/user.entity';
import { Post } from './post/post.entity';
import { TagModule } from './tag/tag.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { stringify } from 'querystring';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
       envFilePath: ['.env.development']
      }),
    UsersModule, 
    PostModule, 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=>({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        synchronize: configService.get('DATABASE_SYNC'),
        autoLoadEntities: configService.get('DATABASE_LOAD'),
      }),
    })
    , TagModule, MetaOptionsModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { 
  constructor (private dataSource: DataSource) {}
  

}
