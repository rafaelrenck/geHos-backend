import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import groupsRouter from '@modules/users/infra/http/routes/groups.routes';
import userGroupsRouter from '@modules/users/infra/http/routes/usergroups.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import insurancesRouter from '@modules/insurances/infra/http/routes/insurances.routes';
import patientsRouter from '@modules/patients/infra/http/routes/patients.routes';
import suppliersRouter from '@modules/suppliers/infra/http/routes/suppliers.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.use(ensureAuthenticated);

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/groups', groupsRouter);
routes.use('/usersgroups', userGroupsRouter);
routes.use('/insurances', insurancesRouter);
routes.use('/patients', patientsRouter);
routes.use('/suppliers', suppliersRouter);

export default routes;
