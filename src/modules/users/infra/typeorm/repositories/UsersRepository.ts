import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserDTO from '@modules/users/dtos/IUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { username },
    });

    return user;
  }

  public async create(userData: IUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
