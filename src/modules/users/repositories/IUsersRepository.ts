import User from '@modules/users/infra/typeorm/entities/User';
import IUserDTO from '@modules/users/dtos/IUserDTO';

export default interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  create(data: IUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
