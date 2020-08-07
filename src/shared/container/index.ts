import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
import GroupsRepository from '@modules/users/infra/typeorm/repositories/GroupsRepository';
import IUserGroupsRepository from '@modules/users/repositories/IUserGroupsRepository';
import UserGroupsRepository from '@modules/users/infra/typeorm/repositories/UserGroupsRepository';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import PermissionsRepository from '@modules/users/infra/typeorm/repositories/PermissionsRepository';

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

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository,
);
