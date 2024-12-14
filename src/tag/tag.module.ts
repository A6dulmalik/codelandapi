import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController]
})
export class TagModule {}
