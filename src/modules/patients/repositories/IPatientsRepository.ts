import Patient from '@modules/patients/infra/typeorm/entities/Patient';
import IPatientDTO from '@modules/patients/dtos/IPatientDTO';

export default interface IPatientsRepository {
  findAll(): Promise<Patient[]>;
  findById(id: string): Promise<Patient | undefined>;
  findByPatient(patient: string): Promise<Patient | undefined>;
  create(data: IPatientDTO): Promise<Patient>;
  save(patient: Patient): Promise<Patient>;
}
