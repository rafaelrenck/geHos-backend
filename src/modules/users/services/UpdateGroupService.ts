import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
import Group from '@modules/users/infra/typeorm/entities/Group';

interface IRequest {
  group_id: string;
  group: string;
  description?: string;
}

@injectable()
class UpdateGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({
    group_id,
    group,
    description,
  }: IRequest): Promise<Group> {
    const groupToUpdate = await this.groupsRepository.findById(group_id);

    if (!groupToUpdate) {
      throw new AppError('Grupo não encontrado');
    }

    const groupExists = await this.groupsRepository.findByGroup(group);

    if (groupExists) {
      throw new AppError('Já existe um grupo cadastrado com este nome');
    }

    groupToUpdate.group = group;

    if (description) {
      groupToUpdate.description = description;
    }

    return this.groupsRepository.save(groupToUpdate);
  }
}

export default UpdateGroupService;
