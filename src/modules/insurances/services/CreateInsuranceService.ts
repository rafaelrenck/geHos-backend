import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInsurancesRepository from '@modules/insurances/repositories/IInsurancesRepository';
import Insurance from '@modules/insurances/infra/typeorm/entities/Insurance';

interface IRequest {
  insurance: string;
  cnpj?: string;
}

@injectable()
class CreateInsuranceService {
  constructor(
    @inject('InsurancesRepository')
    private insurancesRepository: IInsurancesRepository,
  ) {}

  public async execute({ insurance, cnpj }: IRequest): Promise<Insurance> {
    const findInsurance = await this.insurancesRepository.findByInsurance(
      insurance,
    );

    if (findInsurance) {
      throw new AppError('Já existe um convênio cadastrado com este nome');
    }

    const insuranceCreated = await this.insurancesRepository.create({
      insurance,
      cnpj,
    });

    return insuranceCreated;
  }
}

export default CreateInsuranceService;
