import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      username,
      password,
      name,
      hr_id,
      cpf,
      board,
      board_uf,
      board_id,
    } = request.body;

    const userToCreate = container.resolve(CreateUserService);

    const userCreated = await userToCreate.execute({
      username,
      password,
      name,
      hr_id,
      cpf,
      board,
      board_uf,
      board_id,
    });

    delete userCreated.password;

    return response.json(userCreated);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    users.forEach(user => {
      delete user.password;
      delete user.password_is_temporary;
    });

    return response.json(users);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;
    const {
      username,
      password,
      name,
      hr_id,
      cpf,
      board,
      board_uf,
      board_id,
    } = request.body;

    const userToUpdate = container.resolve(UpdateUserService);

    const userUpdated = await userToUpdate.execute({
      user_id,
      username,
      password,
      name,
      hr_id,
      cpf,
      board,
      board_uf,
      board_id,
    });

    delete userUpdated.password;
    delete userUpdated.password_is_temporary;

    return response.json(userUpdated);
  }

  public async inactivate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.params.id;

    const userToInactivate = container.resolve(DeleteUserService);

    const userInactivated = await userToInactivate.execute({
      user_id,
    });

    delete userInactivated.password;
    delete userInactivated.password_is_temporary;

    return response.json(userInactivated);
  }
}
