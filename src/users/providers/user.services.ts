/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { GetUserParamDto } from 'src/users/dto/userParam.dto';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { create } from 'domain';


@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    // public users = [
    //     {
    //         "name": "James Bond",
    //         "username": '007',
    //         "occupation": 'Agent',
    //     },
    //     {
    //         "name": "Sherlock Holmes",
    //         "username": "Mr Holmes",
    //         "occupation": "Private Detective",
    //     }
    // ];

    // public findAllUsers(
    //     limit?: number,
    //     page?: number,
    // ): Promise<User[]> {
    //     console.log(limit, page)
    //     // console.log(this.users);
    //     return this.userRepository.find()
    // };

    // public findOneById(getuserparamdto: GetUserParamDto) {
    //     console.log(getuserparamdto)
    //     // console.log( this.users[0])
    //     return this.userRepository.findOneBy(getuserparamdto)
    // }

    public async createUser(createuserdto: CreateUserDto) {
        // Check if user already exists
        const existingUser = await this.userRepository.findOne({
            where: {email: createuserdto.email}
        })

        // Handle Error
        // Create user
        let newUser = this.userRepository.create(createuserdto)
        return newUser = await this.userRepository.save(newUser)
        
    }
}
