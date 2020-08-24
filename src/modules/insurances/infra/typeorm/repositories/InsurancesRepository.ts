import { getRepository, Repository } from 'typeorm';

import IInsurancesRepository from '@modules/insurances/repositories/IInsurancesRepository';
import IInsuranceDTO from '@modules/insurances/dtos/IInsuranceDTO';
import Insurance from '@modules/insurances/infra/typeorm/entities/Insurance';

class InsurancesRepository implements IInsurancesRepository {
  private ormRepository: Repository<Insurance>;

  constructor() {
    this.ormRepository = getRepository(Insurance);
  }

  public async findAll(): Promise<Insurance[]> {
    const insurances = await this.ormRepository.find();

    return insurances;
  }

  public async findById(id: string): Promise<Insurance | undefined> {
    const insurance = await this.ormRepository.findOne(id);

    return insurance;
  }

  public async findByInsurance(
    insurance: string,
  ): Promise<Insurance | undefined> {
    const findInsurance = await this.ormRepository.findOne({
      where: { insurance },
    });

    return findInsurance;
  }

  public async create(insuranceData: IInsuranceDTO): Promise<Insurance> {
    const insurance = this.ormRepository.create(insuranceData);

    await this.ormRepository.save(insurance);

    return insurance;
  }

  public async save(insurance: Insurance): Promise<Insurance> {
    return this.ormRepository.save(insurance);
  }

  public async delete(insurance: Insurance): Promise<Insurance> {
    return this.ormRepository.remove(insurance);
  }
}

export default InsurancesRepository;
