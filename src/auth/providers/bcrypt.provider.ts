import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';


@Injectable()
export class BcryptProvider implements HashingProvider{
    //Hash
    public async hashPassword(data: string | Buffer): Promise<string> {
        //Generate Salt
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(data, salt);
        // throw new Error ('Method not implemented');
    }


    //Compare
    public comparePassword(data: string | Buffer, encrypted: string): Promise<boolean> {
        return bcrypt.compare(data, encrypted);
    }
}
