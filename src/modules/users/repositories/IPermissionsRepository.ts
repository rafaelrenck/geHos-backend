import Permission from '@modules/users/infra/typeorm/entities/Permission';
import IPermissionDTO from '@modules/users/dtos/IPermissionDTO';

export default interface IPermissionsRepository {
  findAll(): Promise<Permission[]>;
  findById(id: string): Promise<Permission | undefined>;
  findByPermission(permission: string): Promise<Permission | undefined>;
  create(data: IPermissionDTO): Promise<Permission>;
  save(permission: Permission): Promise<Permission>;
  delete(permission: Permission): Promise<Permission>;
}
