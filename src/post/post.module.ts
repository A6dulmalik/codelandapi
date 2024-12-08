/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
// import { ServiceService } from './provider/service.service';

@Module({
  controllers: [PostController],
  // providers: [ServiceService],
})
export class PostModule { }
