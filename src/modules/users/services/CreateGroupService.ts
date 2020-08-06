import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
import Group from '@modules/users/infra/typeorm/entities/Group';

interface IRequest {
  group: string;
  description?: string;
}

@injectable()
class CreateGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ group, description }: IRequest): Promise<Group> {
    const findGroup = await this.groupsRepository.findByGroup(group);

    if (findGroup) {
      throw new AppError('Já existe um grupo cadastrado com este nome');
    }

    const groupCreated = await this.groupsRepository.create({
      group,
      description,
    });

    return groupCreated;
  }
}

export default CreateGroupService;
