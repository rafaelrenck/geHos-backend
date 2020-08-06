import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import Permission from '@modules/users/infra/typeorm/entities/Permission';

interface IRequest {
  permission: string;
  description?: string;
}

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    permission,
    description,
  }: IRequest): Promise<Permission> {
    const findPermission = await this.permissionsRepository.findByPermission(
      permission,
    );

    if (findPermission) {
      throw new AppError('Já existe uma permissão cadastrada com este nome');
    }

    const permissionCreated = await this.permissionsRepository.create({
      permission,
      description,
    });

    return permissionCreated;
  }
}

export default CreatePermissionService;
