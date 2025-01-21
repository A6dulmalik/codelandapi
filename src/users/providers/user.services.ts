import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
// import { GetUserParamDto } from 'src/users/dto/userParam.dto';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByEmail } from './find-one-by-email';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneByEmail: FindOneByEmail,
  ) {}

  public findAllUsers(limit?: number, page?: number): Promise<User[]> {
    console.log(limit, page);
    // console.log(this.users);
    return this.userRepository.find();
  }

  public async findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  public async findByEmail(email: string) {
    return await this.findOneByEmail.findOneByEmail(email);
  }

  public async createUser(createuserdto: CreateUserDto) {
    return await this.createUserProvider.createUser(createuserdto);
  }

  public async deleteUser() {}
}
