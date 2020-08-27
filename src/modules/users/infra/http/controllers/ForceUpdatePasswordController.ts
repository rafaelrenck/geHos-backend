import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForceUpdatePasswordService from '@modules/users/services/ForceUpdatePasswordService';

export default class ForceUpdatePasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { password, email } = request.body;

    const forceUpdatePassword = container.resolve(ForceUpdatePasswordService);

    const user = await forceUpdatePassword.execute({
      user_id,
      password,
      email,
    });

    return response.json(user);
  }
}
