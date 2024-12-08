import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { UsersController } from './users/users.controller';
// import { UsersController } from './users/users.controller';
// import { PorpertiesModule } from './porperties/porperties.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UsersModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
