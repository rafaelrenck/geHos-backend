import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePermissionService from '@modules/users/services/CreatePermissionService';
import ListPermissionsService from '@modules/users/services/ListPermissionsService';
import UpdatePermissionService from '@modules/users/services/UpdatePermissionService';
import DeletePermissionService from '@modules/users/services/DeletePermissionService';

export default class PermissionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { permission, description } = request.body;

    const permissionToCreate = container.resolve(CreatePermissionService);

    const permissionCreated = await permissionToCreate.execute({
      permission,
      description,
    });

    return response.json(permissionCreated);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listPermissions = container.resolve(ListPermissionsService);

    const permissions = await listPermissions.execute();

    return response.json(permissions);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const permission_id = request.params.id;
    const { permission, description } = request.body;

    const permissionToUpdate = container.resolve(UpdatePermissionService);

    const permissionUpdated = await permissionToUpdate.execute({
      permission_id,
      permission,
      description,
    });

    return response.json(permissionUpdated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const permission_id = request.params.id;

    const permissionToDelete = container.resolve(DeletePermissionService);

    const permissionDeleted = await permissionToDelete.execute({
      permission_id,
    });

    return response.json(permissionDeleted);
  }
}
