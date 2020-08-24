import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInsurancesRepository from '@modules/insurances/repositories/IInsurancesRepository';
import Insurance from '@modules/insurances/infra/typeorm/entities/Insurance';

interface IRequest {
  insurance_id: string;
}

@injectable()
class DeleteInsuranceService {
  constructor(
    @inject('InsurancesRepository')
    private insurancesRepository: IInsurancesRepository,
  ) {}

  public async execute({ insurance_id }: IRequest): Promise<Insurance> {
    const insurance = await this.insurancesRepository.findById(insurance_id);

    if (!insurance) {
      throw new AppError('Convênio não encontrado');
    }

    return this.insurancesRepository.delete(insurance);
  }
}

export default DeleteInsuranceService;
