import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, email } = request.body;

    const newPassword = container.resolve(ResetPasswordService);

    await newPassword.execute({
      username,
      email,
    });

    return response.json(newPassword);
  }
}
