import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserGroupsRepository from '@modules/users/repositories/IUserGroupsRepository';
import UserGroup from '@modules/users/infra/typeorm/entities/UserGroup';

interface IRequest {
  user_id: string;
  group_id: string;
}

@injectable()
class AddUserGroupService {
  constructor(
    @inject('UserGroupsRepository')
    private userGroupsRepository: IUserGroupsRepository,
  ) {}

  public async execute({ user_id, group_id }: IRequest): Promise<UserGroup> {
    const findUserGroup = await this.userGroupsRepository.findByUserGroup({
      user_id,
      group_id,
    });

    if (findUserGroup) {
      throw new AppError('Este usuário já faz parte deste grupo');
    }

    const userGroupCreated = await this.userGroupsRepository.create({
      user_id,
      group_id,
    });

    return userGroupCreated;
  }
}

export default AddUserGroupService;
