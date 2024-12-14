import { PostStatus } from "src/post/enums/postStatus.enum";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { IsArray, IsDate, IsEnum,  IsISO8601,  isISO8601,  IsNotEmpty,  IsObject, IsOptional, IsString, MinLength } from "class-validator";
import { PostType } from "src/post/enums/postType.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @IsOptional()
    @IsObject()
    author: CreateUserDto
    
    @ApiProperty({
        example: "Title of post must be minimum of 4 chars and a string"
    })
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        enum: PostType,
        description: 'Accepted values are either story, reviewed, draft and published'
    })
    @IsEnum(PostType)
    postType: PostType;

    @ApiProperty({
        enum: PostStatus,
        description: 'Values are drafts, scheduled, reviewed, published'
    })
    @IsEnum(PostStatus)
    postStatus: PostStatus;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsDate()
    @IsOptional()
    @IsISO8601()
    publishedDate: Date;

    

    @IsArray()
    @IsString({each: true})
    tags: string[];
}