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
    SetMetadata,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { UserService } from './providers/user.services';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserParamDto } from './dto/userParam.dto';
import { AccessTokenGuard } from 'src/auth/guard/access-token/access-token.guard';
import { enumTypes } from 'src/auth/enums/auth-types.enums';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }
    
    // GET  Request all/byId
    @ApiResponse({
        status: 200,
        description: 'Users fetched successfully based on the query'
    })
    @ApiOperation({
        summary: 'Fetches from the users'
    })
    
    // @UseGuards(AccessTokenGuard)
    @Get("/:id?")
    @ApiQuery({
        name: 'page',
        type: 'number',
        required: false,
        description: 'page number'
    })
    public getUsers(
        @Param() getuserparamdto: GetUserParamDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ) {
        return this.userService.findAllUsers()
    }

    //Post Request
    @ApiResponse({
        status: 200,
        description: 'User created successfully.'
    })
    @ApiOperation({
        summary: 'creates a new user'
    })
    @Post()
    // @SetMetadata('authType', 'None')
    @Auth(enumTypes.None)
    public createUsers(
        @Body() createuserdto: CreateUserDto,
        // @Ip() ip: string,
        // @Headers() header: any) 
    ) {
        return this.userService.createUser(createuserdto);
    }


    @ApiResponse({
        status: 200, 
        description: 'User edited successfully'
    })
    @ApiOperation({
        summary: 'Edits an existing user'
    })
    @Patch()
    public UpdateUser(
        @Body() updateuserdto: UpdateUserDto
    ) {
        console.log(updateuserdto)
        return 'Patching up the pants';
    }
}