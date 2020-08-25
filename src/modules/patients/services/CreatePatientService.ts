import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPatientsRepository from '@modules/patients/repositories/IPatientsRepository';
import Patient from '@modules/patients/infra/typeorm/entities/Patient';

interface IRequest {
  patient: string;
  gender: string;
  date_of_birth: Date;
  mom: string;
  dad?: string;
  cpf?: string;
  rg?: string;
  cns?: string;
  telephone?: string;
  email?: string;
}

@injectable()
class CreatePatientService {
  constructor(
    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,
  ) {}

  public async execute({
    patient,
    gender,
    date_of_birth,
    mom,
    dad,
    cpf,
    rg,
    cns,
    telephone,
    email,
  }: IRequest): Promise<Patient> {
    const findPatient = await this.patientsRepository.findByPatient(patient);

    if (
      findPatient &&
      findPatient.date_of_birth === date_of_birth &&
      findPatient.mom === mom
    ) {
      throw new AppError(
        'Já existe um paciente cadastrado com este nome, data de nascimento e nome da mãe',
      );
    }

    const patientCreated = await this.patientsRepository.create({
      patient,
      gender,
      date_of_birth,
      mom,
      dad,
      cpf,
      rg,
      cns,
      telephone,
      email,
    });

    return patientCreated;
  }
}

export default CreatePatientService;
