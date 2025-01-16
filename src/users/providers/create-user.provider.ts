import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUserProvider {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        //Inject hashing provider
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider
    ) {}

    public async createUser(createuserdto: CreateUserDto) {

        // Check if user already exists
        let existingUser = undefined;

        // Handle Error
        try{
             existingUser = await this.userRepository.findOne({
            where: {email: createuserdto.email}
        })
        } catch(error) {
            throw new RequestTimeoutException('Unable to process at the moment, try again later', 
                {
                    description: 'Error connecting to db',
                    cause: 'The user is having a slow network'
                })
        };


        // Create user
        let newUser = this.userRepository.create({
            ...createuserdto, 
            password: await this.hashingProvider.hashPassword(createuserdto.password)
        })
       try {
        newUser =  await this.userRepository.save(newUser);
       } catch (error) {
        return error
       }

       return newUser;
        
    }

}
