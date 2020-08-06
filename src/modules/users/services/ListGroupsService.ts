import { injectable, inject } from 'tsyringe';

import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';

import Group from '@modules/users/infra/typeorm/entities/Group';

@injectable()
class ListGroupsService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute(): Promise<Group[]> {
    const groups = await this.groupsRepository.findAll();

    return groups;
  }
}

export default ListGroupsService;
