/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    // Headers,
    // Ip,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
// import { GetUserParamDto } from 'src/dto/userParam.dto';
import { UserService } from './services/user.services';
import { GetUserParamDto } from 'src/dto/userParam.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Get("/:id?")
    public getUsers(
        @Param() getuserparamdto: GetUserParamDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ) {
        // console.log(typeof getuserparamdto, getuserparamdto); // Logging id and its type
        console.log(typeof limit, typeof page, limit, page); // Logging limit and page
        console.log(this.userService.findOneById(getuserparamdto));
        return (this.userService.findAllUsers());
    }

    @Post()
    public createUsers(
        @Body() createuserdto: CreateUserDto,
        // @Ip() ip: string,
        // @Headers() header: any) 
    ) {
        console.log(typeof createuserdto, createuserdto,);
        console.log(createuserdto instanceof CreateUserDto)
        // console.log(header);
        return 'Posting your request';

    }

    @Patch()
    public UpdateUser(
        @Body() updateuserdto: UpdateUserDto
    ) {
        console.log(updateuserdto)
        return 'Patching up the pants';
    }
}