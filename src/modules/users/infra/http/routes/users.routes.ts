import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.list);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.inactivate);

export default usersRouter;
