import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInsurancesRepository from '@modules/insurances/repositories/IInsurancesRepository';
import Insurance from '@modules/insurances/infra/typeorm/entities/Insurance';

interface IRequest {
  insurance_id: string;
  insurance: string;
  cnpj?: string;
}

@injectable()
class UpdateInsuranceService {
  constructor(
    @inject('InsurancesRepository')
    private insurancesRepository: IInsurancesRepository,
  ) {}

  public async execute({
    insurance_id,
    insurance,
    cnpj,
  }: IRequest): Promise<Insurance> {
    const insuranceToUpdate = await this.insurancesRepository.findById(
      insurance_id,
    );

    if (!insuranceToUpdate) {
      throw new AppError('Convênio não encontrado');
    }

    const insuranceExists = await this.insurancesRepository.findByInsurance(
      insurance,
    );

    if (insuranceExists && insuranceExists.id !== insurance_id) {
      throw new AppError('Já existe um convênio cadastrado com este nome');
    }

    insuranceToUpdate.insurance = insurance;

    if (cnpj) {
      insuranceToUpdate.cnpj = cnpj;
    }

    return this.insurancesRepository.save(insuranceToUpdate);
  }
}

export default UpdateInsuranceService;
