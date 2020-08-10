import { Router } from 'express';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ForceUpdatePasswordController from '@modules/users/infra/http/controllers/ForceUpdatePasswordController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const forceUpdatePasswordController = new ForceUpdatePasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post(
  '/update',
  ensureAuthenticated,
  forceUpdatePasswordController.create,
);

export default passwordRouter;
