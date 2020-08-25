import { Router } from 'express';

import InsurancesController from '@modules/insurances/infra/http/controllers/InsurancesController';

const insurancesRouter = Router();
const insurancesController = new InsurancesController();

insurancesRouter.post('/', insurancesController.create);
insurancesRouter.get('/', insurancesController.list);
insurancesRouter.put('/:id', insurancesController.update);
insurancesRouter.delete('/:id', insurancesController.inactivate);

export default insurancesRouter;
