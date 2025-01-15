import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class FindOneByEmail {
    constructor(
        @InjectRepository (User)
        private readonly userRepository: Repository<User>
    ) {}

    public async findOneByEmail(email: string) {
        let user: User | undefined;

        try {
            user = await this.userRepository.findOneBy({email})
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Error fetching user',
                cause: 'the user is not found'
            })
        }

        if(!user){
            throw new UnauthorizedException('User Not Found')
        }
        
        return user
    }
}
