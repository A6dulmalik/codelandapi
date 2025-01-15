import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.services';
import { SignInDto } from '../dto/signin-auth.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInProvider {
    constructor(
    @Inject(forwardRef(()=> UserService))
    private readonly userService: UserService,

    private readonly  hashingProvider: HashingProvider,

    //JWT config injection
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService
) {}

  public async SignIn (signInDto: SignInDto) {
    //Find the user in the db by email and Throw an error if the user is not found
    let user = await this.userService.findByEmail(signInDto.email);
    
    //Compare the inputed passsword to the hashed password
    let isEqual: boolean = false;
    try {
        isEqual = await this.hashingProvider.comparePassword(
            signInDto.password,
            user.password
        )
    } catch (error) {
        throw new RequestTimeoutException(
            error, 
            {description: 'Error connecting to db'}
        )
    }

    //Send confirmation message
    if(!isEqual) {
        throw new UnauthorizedException('Email/Password incorrect')
    }

    const accessToken = await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
    }, {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.ttl,
    })

    return {accessToken}
  }
}
