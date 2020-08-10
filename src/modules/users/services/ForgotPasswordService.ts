import { injectable, inject } from 'tsyringe';
import { uuid } from 'uuidv4';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  username: string;
  email: string;
}

@injectable()
class ForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, email }: IRequest): Promise<User> {
    const findUser = await this.usersRepository.findByUsername(username);

    if (!findUser) {
      throw new AppError('Usuário não encontrado');
    }

    if (findUser.email !== email) {
      throw new AppError('E-mail informado não percence ao usuário');
    }

    const newTemporaryPassword = uuid().substring(0, 6);

    findUser.password = await this.hashProvider.generateHash(
      newTemporaryPassword,
    );
    findUser.password_is_temporary = true;

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: findUser.name,
        email: findUser.email,
      },
      subject: '[geHos] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: findUser.name,
          newPassword: newTemporaryPassword,
        },
      },
    });

    return this.usersRepository.save(findUser);
  }
}

export default ForgotPasswordService;
