import Insurance from '@modules/insurances/infra/typeorm/entities/Insurance';
import IInsuranceDTO from '@modules/insurances/dtos/IInsuranceDTO';

export default interface IInsurancesRepository {
  findAll(): Promise<Insurance[]>;
  findById(id: string): Promise<Insurance | undefined>;
  findByInsurance(insurance: string): Promise<Insurance | undefined>;
  create(data: IInsuranceDTO): Promise<Insurance>;
  save(insurance: Insurance): Promise<Insurance>;
  delete(insurance: Insurance): Promise<Insurance>;
}
