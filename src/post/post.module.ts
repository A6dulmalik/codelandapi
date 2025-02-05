/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
// import { ServiceService } from './provider/service.service';
import { PostService } from './provider/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { UsersModule } from 'src/users/users.module';
import { TagModule } from 'src/tag/tag.module';
import { PaginationModule } from 'src/common/pagination.module';

@Module({
  imports: [
    UsersModule,
    TagModule,
    TypeOrmModule.forFeature([Post]),
    PaginationModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [TypeOrmModule],
})
export class PostModule {}
