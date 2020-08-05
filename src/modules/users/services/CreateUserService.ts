import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  username: string;
  password: string;
  name: string;
  hr_id?: number;
  cpf?: string;
  board?: string;
  board_uf?: string;
  board_id?: number;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    username,
    password,
    name,
    hr_id,
    cpf,
    board,
    board_uf,
    board_id,
  }: IRequest): Promise<User> {
    const checkIfUserAlreadyExists = await this.usersRepository.findByUsername(
      username,
    );

    if (checkIfUserAlreadyExists) {
      throw new AppError('Este nome de suário já está sendo utilizado');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      username,
      password: hashedPassword,
      name,
      hr_id,
      cpf,
      board,
      board_uf,
      board_id,
    });

    return user;
  }
}

export default CreateUserService;
