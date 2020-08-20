import { Router } from 'express';

import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';
import ForceUpdatePasswordController from '@modules/users/infra/http/controllers/ForceUpdatePasswordController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();
const forceUpdatePasswordController = new ForceUpdatePasswordController();

passwordRouter.post('/reset', resetPasswordController.create);
passwordRouter.post(
  '/update',
  ensureAuthenticated,
  forceUpdatePasswordController.create,
);

export default passwordRouter;
