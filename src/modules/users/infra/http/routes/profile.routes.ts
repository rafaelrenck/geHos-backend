import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ProfileAvatarController from '@modules/users/infra/http/controllers/ProfileAvatarController';

const profileRouter = Router();
const profileController = new ProfileController();
const profileAvatarController = new ProfileAvatarController();
const upload = multer(uploadConfig);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);
profileRouter.patch(
  '/avatar',
  upload.single('avatar'),
  profileAvatarController.update,
);
profileRouter.delete('/avatar', profileAvatarController.delete);

export default profileRouter;
