import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
import GroupsRepository from '@modules/users/infra/typeorm/repositories/GroupsRepository';
import IUserGroupsRepository from '@modules/users/repositories/IUserGroupsRepository';
import UserGroupsRepository from '@modules/users/infra/typeorm/repositories/UserGroupsRepository';
import IInsurancesRepository from '@modules/insurances/repositories/IInsurancesRepository';
import InsurancesRepository from '@modules/insurances/infra/typeorm/repositories/InsurancesRepository';
import IPatientsRepository from '@modules/patients/repositories/IPatientsRepository';
import PatientsRepository from '@modules/patients/infra/typeorm/repositories/PatientsRepository';
import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import SuppliersRepository from '@modules/suppliers/infra/typeorm/repositories/SuppliersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
);

container.registerSingleton<IUserGroupsRepository>(
  'UserGroupsRepository',
  UserGroupsRepository,
);

container.registerSingleton<IInsurancesRepository>(
  'InsurancesRepository',
  InsurancesRepository,
);

container.registerSingleton<IPatientsRepository>(
  'PatientsRepository',
  PatientsRepository,
);

container.registerSingleton<ISuppliersRepository>(
  'SuppliersRepository',
  SuppliersRepository,
);
