import { getRepository, Repository } from 'typeorm';

import IUserGroupsRepository from '@modules/users/repositories/IUserGroupsRepository';
import IUserGroupDTO from '@modules/users/dtos/IUserGroupDTO';
import UserGroup from '@modules/users/infra/typeorm/entities/UserGroup';

class UserGroupsRepository implements IUserGroupsRepository {
  private ormRepository: Repository<UserGroup>;

  constructor() {
    this.ormRepository = getRepository(UserGroup);
  }

  public async findByUserGroup(
    user_group: IUserGroupDTO,
  ): Promise<UserGroup | undefined> {
    const findUserGroup = await this.ormRepository.findOne({
      where: {
        user_id: user_group.user_id,
        group_id: user_group.group_id,
      },
    });

    return findUserGroup;
  }

  public async create(user_group: IUserGroupDTO): Promise<UserGroup> {
    const userGroup = this.ormRepository.create(user_group);

    await this.ormRepository.save(userGroup);

    return userGroup;
  }

  public async save(user_group: UserGroup): Promise<UserGroup> {
    return this.ormRepository.save(user_group);
  }

  public async delete(user_group: UserGroup): Promise<UserGroup> {
    return this.ormRepository.remove(user_group);
  }
}

export default UserGroupsRepository;
