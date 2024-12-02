/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    public getUsers() {
        return 'Getting your request';
    }
    @Post()
    public createUsers() {
        return 'Posting your request';
    }
}
