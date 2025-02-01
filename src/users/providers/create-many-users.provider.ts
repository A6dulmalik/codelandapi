import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';
import { CreateManyUsersDto } from '../dto/create-many-users.dto';

@Injectable()
export class CreateManyUsersProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect QueryRunner to data source
    await queryRunner.connect();

    // Start transaction
    await queryRunner.startTransaction();
    let newUsers: User[] = [];

    try {
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      //when successful
      await queryRunner.commitTransaction();
    } catch (error) {
      //when there is an error startover/cancel
      await queryRunner.rollbackTransaction();
    } finally {
      //release transaction
      await queryRunner.release();
    }

    return newUsers;
    // If successful commit
    // If unsuccessful roll back
    // Release Connection
  }
}
