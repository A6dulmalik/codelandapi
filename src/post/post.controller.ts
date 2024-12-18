/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { PostService } from './provider/post.service';
import { ApiTags } from '@nestjs/swagger';
import { GetPostParamDto } from './dto/postParam.dto';
import { CreatePostDto } from './dto/createPost.dto';


@Controller('posts')
@ApiTags('posts')
export class PostController {
    constructor (private readonly postService: PostService) {}
    
    @Get("/:id?")
    public getPosts(
        @Param('id') getpostparamdto: GetPostParamDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ) {
        console.log('getting all posts');
        return this.postService.findAllPost();
    }

    @Post()
    public createPost (
        @Body() createpostdto: CreatePostDto
    ) {
        console.log(createpostdto)
        return createpostdto
    }
 }
