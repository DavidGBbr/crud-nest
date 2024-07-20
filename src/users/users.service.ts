import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  createUser(user: UserDto) {
    const newUser = {
      id: uuid(),
      username: user.username,
      password: bcryptHashSync(user.password, 10),
    };

    this.users.push(newUser);
    return newUser;
  }

  findByUserName(userName: string): UserDto | null {
    return this.users.find((user) => user.username === userName);
  }
}
