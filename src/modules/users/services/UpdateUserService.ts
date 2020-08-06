import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  username: string;
  password?: string;
  name: string;
  hr_id: number;
  cpf: string;
  board: string;
  board_uf: string;
  board_id: number;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    username,
    password,
    name,
    hr_id,
    cpf,
    board,
    board_uf,
    board_id,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const usernameAlreadyTaken = await this.usersRepository.findByUsername(
      username,
    );

    if (usernameAlreadyTaken && usernameAlreadyTaken.id !== user_id) {
      throw new AppError('Este nome de usuário já está sendo utilizado');
    }

    user.username = username;
    user.name = name;
    user.hr_id = hr_id;
    user.cpf = cpf;
    user.board = board;
    user.board_uf = board_uf;
    user.board_id = board_id;

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
      user.password_is_temporary = true;
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
