import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserGroupsRepository from '@modules/users/repositories/IUserGroupsRepository';
import UserGroup from '@modules/users/infra/typeorm/entities/UserGroup';

interface IRequest {
  user_id: string;
  group_id: string;
}

@injectable()
class RemoveUserGroupService {
  constructor(
    @inject('UserGroupsRepository')
    private userGroupsRepository: IUserGroupsRepository,
  ) {}

  public async execute({ user_id, group_id }: IRequest): Promise<UserGroup> {
    const userGroup = await this.userGroupsRepository.findByUserGroup({
      user_id,
      group_id,
    });

    if (!userGroup) {
      throw new AppError('Relacionamento de usuário e grupo não encontrado');
    }

    return this.userGroupsRepository.delete(userGroup);
  }
}

export default RemoveUserGroupService;
