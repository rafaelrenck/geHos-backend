import { Router } from 'express';

import PatientsController from '@modules/patients/infra/http/controllers/PatientsController';

const patientsRouter = Router();
const patientsController = new PatientsController();

patientsRouter.post('/', patientsController.create);
patientsRouter.get('/', patientsController.list);
patientsRouter.put('/:id', patientsController.update);
patientsRouter.delete('/:id', patientsController.reportDeath);

export default patientsRouter;
