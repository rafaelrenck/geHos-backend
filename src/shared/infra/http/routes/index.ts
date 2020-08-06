import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import groupsRouter from '@modules/users/infra/http/routes/groups.routes';
import permissionsRouter from '@modules/users/infra/http/routes/permissions.routes';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated);

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/groups', groupsRouter);
routes.use('/permissions', permissionsRouter);

export default routes;
