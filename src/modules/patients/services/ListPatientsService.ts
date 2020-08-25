import { injectable, inject } from 'tsyringe';

import IPatientsRepository from '@modules/patients/repositories/IPatientsRepository';

import Patient from '@modules/patients/infra/typeorm/entities/Patient';

@injectable()
class ListPatientsService {
  constructor(
    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,
  ) {}

  public async execute(): Promise<Patient[]> {
    const patients = await this.patientsRepository.findAll();

    return patients;
  }
}

export default ListPatientsService;
