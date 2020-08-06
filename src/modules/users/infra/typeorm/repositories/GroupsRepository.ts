import { getRepository, Repository } from 'typeorm';

import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
import ICreateGroupDTO from '@modules/users/dtos/ICreateGroupDTO';
import Group from '@modules/users/infra/typeorm/entities/Group';

class GroupsRepository implements IGroupsRepository {
  private ormRepository: Repository<Group>;

  constructor() {
    this.ormRepository = getRepository(Group);
  }

  public async findAll(): Promise<Group[]> {
    const groups = await this.ormRepository.find();

    return groups;
  }

  public async findById(id: string): Promise<Group | undefined> {
    const group = await this.ormRepository.findOne(id);

    return group;
  }

  public async findByGroup(group: string): Promise<Group | undefined> {
    const findGroup = await this.ormRepository.findOne({
      where: { group },
    });

    return findGroup;
  }

  public async create(groupData: ICreateGroupDTO): Promise<Group> {
    const group = this.ormRepository.create(groupData);

    await this.ormRepository.save(group);

    return group;
  }

  public async save(group: Group): Promise<Group> {
    return this.ormRepository.save(group);
  }

  public async delete(group: Group): Promise<Group> {
    return this.ormRepository.remove(group);
  }
}

export default GroupsRepository;
