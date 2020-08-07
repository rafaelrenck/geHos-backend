import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddUserGroupService from '@modules/users/services/AddUserGroupService';
import RemoveUserGroupService from '@modules/users/services/RemoveUserGroupService';

export default class UserGroupsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, group_id } = request.body;

    const userGroupToAdd = container.resolve(AddUserGroupService);

    const userGroupAdded = await userGroupToAdd.execute({
      user_id,
      group_id,
    });

    return response.json(userGroupAdded);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { user_id, group_id } = request.params;

    const userGroupToRemove = container.resolve(RemoveUserGroupService);

    const userGroupRemoved = await userGroupToRemove.execute({
      user_id,
      group_id,
    });

    return response.json(userGroupRemoved);
  }
}
