import { injectable, inject } from 'tsyringe';

import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';

import Permission from '@modules/users/infra/typeorm/entities/Permission';

@injectable()
class ListPermissionsService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute(): Promise<Permission[]> {
    const permissions = await this.permissionsRepository.findAll();

    return permissions;
  }
}

export default ListPermissionsService;
