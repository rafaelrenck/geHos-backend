import { v4 } from 'uuid';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IUserDTO from '@modules/users/dtos/IUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(iUser => iUser.id === id);
    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = this.users.find(iUser => iUser.username === username);
    return user;
  }

  public async create(userData: IUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(iUser => iUser.id === user.id);

    this.users[userIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
