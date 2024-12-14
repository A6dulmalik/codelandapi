/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
// import { ServiceService } from './provider/service.service';
import { PostService } from './provider/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule { }
