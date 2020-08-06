import { Router } from 'express';

import PermissionsController from '@modules/users/infra/http/controllers/PermissionsController';

const permissionsRouter = Router();
const permissionsController = new PermissionsController();

permissionsRouter.post('/', permissionsController.create);
permissionsRouter.get('/', permissionsController.list);
permissionsRouter.put('/:id', permissionsController.update);
permissionsRouter.delete('/:id', permissionsController.delete);

export default permissionsRouter;
