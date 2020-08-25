import { Router } from 'express';

import SuppliersController from '@modules/suppliers/infra/http/controllers/SuppliersController';

const suppliersRouter = Router();
const suppliersController = new SuppliersController();

suppliersRouter.post('/', suppliersController.create);
suppliersRouter.get('/', suppliersController.list);
suppliersRouter.put('/:id', suppliersController.update);
suppliersRouter.delete('/:id', suppliersController.inactivate);

export default suppliersRouter;
