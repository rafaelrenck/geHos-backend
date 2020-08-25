import { getRepository, Repository } from 'typeorm';

import IPatientsRepository from '@modules/patients/repositories/IPatientsRepository';
import IPatientDTO from '@modules/patients/dtos/IPatientDTO';
import Patient from '@modules/patients/infra/typeorm/entities/Patient';

class PatientsRepository implements IPatientsRepository {
  private ormRepository: Repository<Patient>;

  constructor() {
    this.ormRepository = getRepository(Patient);
  }

  public async findAll(): Promise<Patient[]> {
    const patients = await this.ormRepository.find();

    return patients;
  }

  public async findById(id: string): Promise<Patient | undefined> {
    const patient = await this.ormRepository.findOne(id);

    return patient;
  }

  public async findByPatient(patient: string): Promise<Patient | undefined> {
    const findPatient = await this.ormRepository.findOne({
      where: { patient },
    });

    return findPatient;
  }

  public async create(patientData: IPatientDTO): Promise<Patient> {
    const patient = this.ormRepository.create(patientData);

    await this.ormRepository.save(patient);

    return patient;
  }

  public async save(patient: Patient): Promise<Patient> {
    return this.ormRepository.save(patient);
  }
}

export default PatientsRepository;
