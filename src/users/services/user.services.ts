/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { GetUserParamDto } from 'src/dto/userParam.dto';

// @Injectable()
// export class UserService {
//   public users = [];
//   public findAllUsers(): object[] {
//     return this.users;
//   }
// }
@Injectable()
export class UserService {
    public users = [
        {
            "name": "James Bond",
            "username": '007',
            "occupation": 'Agent',
        },
        {
            "name": "Sherlock Holmes",
            "username": "Mr Holmes",
            "occupation": "Private Detective",
        }
    ];
    public findAllUsers(
        limit?: number,
        page?: number,
    ) {
        console.log(limit, page)
        return this.users;
    };

    public findOneById(getuserparamdto: GetUserParamDto) {
        console.log(getuserparamdto)
        return this.users[0]
        // console.log(this.users)
        // console.log(id)
    }
}
