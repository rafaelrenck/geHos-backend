import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPatientsRepository from '@modules/patients/repositories/IPatientsRepository';
import Patient from '@modules/patients/infra/typeorm/entities/Patient';

interface IRequest {
  patient_id: string;
  date_of_death: Date;
}

@injectable()
class DeletePatientService {
  constructor(
    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,
  ) {}

  public async execute({
    patient_id,
    date_of_death,
  }: IRequest): Promise<Patient> {
    const patient = await this.patientsRepository.findById(patient_id);

    if (!patient) {
      throw new AppError('Paciente não encontrado');
    }

    patient.date_of_death = date_of_death;

    return this.patientsRepository.save(patient);
  }
}

export default DeletePatientService;
