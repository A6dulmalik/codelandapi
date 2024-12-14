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

@Module({
  imports: [
    UsersModule, 
    PostModule, 
    TypeOrmModule.forRootAsync({
      useFactory: ()=>({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1234',
        database: 'codeland',
        // entities: [User, Post], 
        
        synchronize: true,
        autoLoadEntities: true,
        import: [],
        inject: [],
      })
    }), TagModule, MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { 
  constructor (private dataSource: DataSource) {}
}
