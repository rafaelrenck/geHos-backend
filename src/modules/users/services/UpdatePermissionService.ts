import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import Permission from '@modules/users/infra/typeorm/entities/Permission';

interface IRequest {
  permission_id: string;
  permission: string;
  description?: string;
}

@injectable()
class UpdatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    permission_id,
    permission,
    description,
  }: IRequest): Promise<Permission> {
    const permissionToUpdate = await this.permissionsRepository.findById(
      permission_id,
    );

    if (!permissionToUpdate) {
      throw new AppError('Permissão não encontrada');
    }

    const permissionExists = await this.permissionsRepository.findByPermission(
      permission,
    );

    if (permissionExists) {
      throw new AppError('Já existe uma permissão cadastrada com este nome');
    }

    permissionToUpdate.permission = permission;

    if (description) {
      permissionToUpdate.description = description;
    }

    return this.permissionsRepository.save(permissionToUpdate);
  }
}

export default UpdatePermissionService;
