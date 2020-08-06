import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
import Group from '@modules/users/infra/typeorm/entities/Group';

interface IRequest {
  group_id: string;
}

@injectable()
class DeleteGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ group_id }: IRequest): Promise<Group> {
    const group = await this.groupsRepository.findById(group_id);

    if (!group) {
      throw new AppError('Grupo não encontrado');
    }

    return this.groupsRepository.delete(group);
  }
}

export default DeleteGroupService;
