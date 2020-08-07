import UserGroup from '@modules/users/infra/typeorm/entities/UserGroup';
import IUserGroupDTO from '@modules/users/dtos/IUserGroupDTO';

export default interface IUserGroupsRepository {
  findByUserGroup(data: IUserGroupDTO): Promise<UserGroup | undefined>;
  create(data: IUserGroupDTO): Promise<UserGroup>;
  save(user_group: UserGroup): Promise<UserGroup>;
  delete(user_group: UserGroup): Promise<UserGroup>;
}
