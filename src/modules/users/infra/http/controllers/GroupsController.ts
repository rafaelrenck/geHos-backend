import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGroupService from '@modules/users/services/CreateGroupService';
import ListGroupsService from '@modules/users/services/ListGroupsService';
import UpdateGroupService from '@modules/users/services/UpdateGroupService';
import DeleteGroupService from '@modules/users/services/DeleteGroupService';

export default class GroupsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { group, description } = request.body;

    const groupToCreate = container.resolve(CreateGroupService);

    const groupCreated = await groupToCreate.execute({
      group,
      description,
    });

    return response.json(groupCreated);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listGroups = container.resolve(ListGroupsService);

    const groups = await listGroups.execute();

    return response.json(groups);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const group_id = request.params.id;
    const { group, description } = request.body;

    const groupToUpdate = container.resolve(UpdateGroupService);

    const groupUpdated = await groupToUpdate.execute({
      group_id,
      group,
      description,
    });

    return response.json(groupUpdated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const group_id = request.params.id;

    const groupToDelete = container.resolve(DeleteGroupService);

    const groupDeleted = await groupToDelete.execute({
      group_id,
    });

    return response.json(groupDeleted);
  }
}
