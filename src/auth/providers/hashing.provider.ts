import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
    //Hashing of password at signup
    abstract hashPassword(data: string | Buffer): Promise<string>

    //Compare password during signin
    abstract comparePassword(data: string | Buffer, encrypted: string): Promise<boolean>
}
