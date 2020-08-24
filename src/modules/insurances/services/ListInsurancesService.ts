import { injectable, inject } from 'tsyringe';

import IInsurancesRepository from '@modules/insurances/repositories/IInsurancesRepository';

import Insurance from '@modules/insurances/infra/typeorm/entities/Insurance';

@injectable()
class ListInsurancesService {
  constructor(
    @inject('InsurancesRepository')
    private insurancesRepository: IInsurancesRepository,
  ) {}

  public async execute(): Promise<Insurance[]> {
    const insurances = await this.insurancesRepository.findAll();

    return insurances;
  }
}

export default ListInsurancesService;
