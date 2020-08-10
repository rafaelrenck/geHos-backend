import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, email } = request.body;

    const forgotPassword = container.resolve(ForgotPasswordService);

    await forgotPassword.execute({
      username,
      email,
    });

    return response.status(204).json();
  }
}
