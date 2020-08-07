import { Router } from 'express';

import UserGroupsController from '@modules/users/infra/http/controllers/UserGroupsController';

const userGroupsRouter = Router();
const userGroupsController = new UserGroupsController();

userGroupsRouter.post('/', userGroupsController.create);
userGroupsRouter.delete('/:user_id/:group_id', userGroupsController.delete);

export default userGroupsRouter;
