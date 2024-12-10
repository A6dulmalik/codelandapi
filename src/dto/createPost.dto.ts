import { PostStatus } from "src/post/enums/postStatus.enum";
import { CreateUserDto } from "./create-user.dto";
import { IsArray, IsDate, IsEnum,  IsISO8601,  isISO8601,  IsNotEmpty,  IsObject, IsOptional, IsString, MinLength } from "class-validator";
import { PostType } from "src/post/enums/postType.enum";

export class CreatePostDto {
    @IsObject()
    author: CreateUserDto
    
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;

    @IsEnum(PostType)
    postType: PostType;

    @IsEnum(PostStatus)
    postStatus: PostStatus;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsDate()
    @IsISO8601()
    publishedDate: Date;

    @IsArray()
    @IsString({each: true})
    tags: string[];
}