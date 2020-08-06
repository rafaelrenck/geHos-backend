import { getRepository, Repository } from 'typeorm';

import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import ICreatePermissionDTO from '@modules/users/dtos/ICreatePermissionDTO';
import Permission from '@modules/users/infra/typeorm/entities/Permission';

class PermissionsRepository implements IPermissionsRepository {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }

  public async findAll(): Promise<Permission[]> {
    const permissions = await this.ormRepository.find();

    return permissions;
  }

  public async findById(id: string): Promise<Permission | undefined> {
    const permission = await this.ormRepository.findOne(id);

    return permission;
  }

  public async findByPermission(
    permission: string,
  ): Promise<Permission | undefined> {
    const findPermission = await this.ormRepository.findOne({
      where: { permission },
    });

    return findPermission;
  }

  public async create(
    permissionData: ICreatePermissionDTO,
  ): Promise<Permission> {
    const permission = this.ormRepository.create(permissionData);

    return this.ormRepository.save(permission);
  }

  public async save(permission: Permission): Promise<Permission> {
    return this.ormRepository.save(permission);
  }

  public async delete(permission: Permission): Promise<Permission> {
    return this.ormRepository.remove(permission);
  }
}

export default PermissionsRepository;
