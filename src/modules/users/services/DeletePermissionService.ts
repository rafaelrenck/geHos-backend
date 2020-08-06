import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import Permission from '@modules/users/infra/typeorm/entities/Permission';

interface IRequest {
  permission_id: string;
}

@injectable()
class DeletePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({ permission_id }: IRequest): Promise<Permission> {
    const permission = await this.permissionsRepository.findById(permission_id);

    if (!permission) {
      throw new AppError('Permissão não encontrada');
    }

    return this.permissionsRepository.delete(permission);
  }
}

export default DeletePermissionService;
