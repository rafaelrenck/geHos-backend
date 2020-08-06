import Group from '@modules/users/infra/typeorm/entities/Group';
import ICreateGroupDTO from '@modules/users/dtos/ICreateGroupDTO';

export default interface IGroupsRepository {
  findAll(): Promise<Group[]>;
  findById(id: string): Promise<Group | undefined>;
  findByGroup(group: string): Promise<Group | undefined>;
  create(data: ICreateGroupDTO): Promise<Group>;
  save(group: Group): Promise<Group>;
  delete(group: Group): Promise<Group>;
}
