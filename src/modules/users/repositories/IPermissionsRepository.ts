import Permission from '@modules/users/infra/typeorm/entities/Permission';
import ICreatePermissionDTO from '@modules/users/dtos/ICreatePermissionDTO';

export default interface IPermissionsRepository {
  findAll(): Promise<Permission[]>;
  findById(id: string): Promise<Permission | undefined>;
  findByPermission(permission: string): Promise<Permission | undefined>;
  create(data: ICreatePermissionDTO): Promise<Permission>;
  save(permission: Permission): Promise<Permission>;
  delete(permission: Permission): Promise<Permission>;
}
