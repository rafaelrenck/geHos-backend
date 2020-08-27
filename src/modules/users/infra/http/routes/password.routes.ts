import { Router } from 'express';

import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';
import ForceUpdatePasswordController from '@modules/users/infra/http/controllers/ForceUpdatePasswordController';
import IgnoreUpdatePasswordController from '@modules/users/infra/http/controllers/IgnoreUpdatePasswordController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();
const forceUpdatePasswordController = new ForceUpdatePasswordController();
const ignoreUpdatePasswordController = new IgnoreUpdatePasswordController();

passwordRouter.post('/reset', resetPasswordController.create);
passwordRouter.post(
  '/update',
  ensureAuthenticated,
  forceUpdatePasswordController.create,
);
passwordRouter.post(
  '/ignore',
  ensureAuthenticated,
  ignoreUpdatePasswordController.create,
);

export default passwordRouter;
