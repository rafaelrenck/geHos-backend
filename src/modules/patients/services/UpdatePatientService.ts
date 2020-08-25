import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPatientsRepository from '@modules/patients/repositories/IPatientsRepository';
import Patient from '@modules/patients/infra/typeorm/entities/Patient';

interface IRequest {
  patient_id: string;
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
  date_of_death?: Date;
}

@injectable()
class UpdatePatientService {
  constructor(
    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,
  ) {}

  public async execute({
    patient_id,
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
    date_of_death,
  }: IRequest): Promise<Patient> {
    const patientToUpdate = await this.patientsRepository.findById(patient_id);

    if (!patientToUpdate) {
      throw new AppError('Paciente não encontrado');
    }

    const patientExists = await this.patientsRepository.findByPatient(patient);

    if (
      patientExists &&
      patientExists.date_of_birth === date_of_birth &&
      patientExists.mom === mom &&
      patientExists.id !== patient_id
    ) {
      throw new AppError(
        'Já existe um paciente cadastrado com este nome, data de nascimento e nome da mãe',
      );
    }

    patientToUpdate.patient = patient;

    if (gender) {
      patientToUpdate.gender = gender;
    }

    if (dad) {
      patientToUpdate.dad = dad;
    }

    if (cpf) {
      patientToUpdate.cpf = cpf;
    }

    if (rg) {
      patientToUpdate.rg = rg;
    }

    if (cns) {
      patientToUpdate.cns = cns;
    }

    if (telephone) {
      patientToUpdate.telephone = telephone;
    }

    if (email) {
      patientToUpdate.email = email;
    }

    return this.patientsRepository.save(patientToUpdate);
  }
}

export default UpdatePatientService;
