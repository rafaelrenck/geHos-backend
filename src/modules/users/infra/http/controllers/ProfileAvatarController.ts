import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileAvatarService from '@modules/users/services/UpdateProfileAvatarService';
import DeleteProfileAvatarService from '@modules/users/services/DeleteProfileAvatarService';

export default class ProfileAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileAvatar = container.resolve(UpdateProfileAvatarService);

    const user = await updateProfileAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deteleProfileAvatar = container.resolve(DeleteProfileAvatarService);

    const user = await deteleProfileAvatar.execute({
      user_id: request.user.id,
    });

    delete user.password;
    delete user.password_is_temporary;

    return response.json(user);
  }
}
