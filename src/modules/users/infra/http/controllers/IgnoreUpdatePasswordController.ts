import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IgnoreUpdatePasswordService from '@modules/users/services/IgnoreUpdatePasswordService';

export default class IgnoreUpdatePasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const ignoreUpdatePassword = container.resolve(IgnoreUpdatePasswordService);

    const userUpdated = await ignoreUpdatePassword.execute({
      user_id,
    });

    return response.json(userUpdated);
  }
}
