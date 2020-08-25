import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePatientService from '@modules/patients/services/CreatePatientService';
import ListPatientsService from '@modules/patients/services/ListPatientsService';
import UpdatePatientService from '@modules/patients/services/UpdatePatientService';
import DeletePatientService from '@modules/patients/services/DeletePatientService';

export default class PatientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const patientToCreate = container.resolve(CreatePatientService);

    const patientCreated = await patientToCreate.execute({
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

    return response.json(patientCreated);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listPatients = container.resolve(ListPatientsService);

    const patients = await listPatients.execute();

    return response.json(patients);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const patient_id = request.params.id;
    const {
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
    } = request.body;

    const patientToUpdate = container.resolve(UpdatePatientService);

    const patientUpdated = await patientToUpdate.execute({
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
    });

    return response.json(patientUpdated);
  }

  public async reportDeath(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const patient_id = request.params.id;
    const { date_of_death } = request.body;

    const patientToDelete = container.resolve(DeletePatientService);

    const patientDeleted = await patientToDelete.execute({
      patient_id,
      date_of_death,
    });

    return response.json(patientDeleted);
  }
}
