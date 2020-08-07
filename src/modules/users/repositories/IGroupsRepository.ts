import Group from '@modules/users/infra/typeorm/entities/Group';
import IGroupDTO from '@modules/users/dtos/IGroupDTO';

export default interface IGroupsRepository {
  findAll(): Promise<Group[]>;
  findById(id: string): Promise<Group | undefined>;
  findByGroup(group: string): Promise<Group | undefined>;
  create(data: IGroupDTO): Promise<Group>;
  save(group: Group): Promise<Group>;
  delete(group: Group): Promise<Group>;
}
