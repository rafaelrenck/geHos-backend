import { Router } from 'express';

import GroupsController from '@modules/users/infra/http/controllers/GroupsController';

const groupsRouter = Router();
const groupsController = new GroupsController();

groupsRouter.post('/', groupsController.create);
groupsRouter.get('/', groupsController.list);
groupsRouter.put('/:id', groupsController.update);
groupsRouter.delete('/:id', groupsController.delete);

export default groupsRouter;
