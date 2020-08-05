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

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      username,
      password,
      name,
      hr_id,
      cpf,
      board,
      board_uf,
      board_id,
    });

    delete user.password;

    return response.json(user);
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

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
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

    delete user.password;
    delete user.password_is_temporary;

    return response.json(user);
  }

  public async inactivate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.params.id;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute({
      user_id,
    });

    delete user.password;
    delete user.password_is_temporary;

    return response.json(user);
  }
}
