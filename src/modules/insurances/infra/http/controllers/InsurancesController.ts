import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateInsuranceService from '@modules/insurances/services/CreateInsuranceService';
import ListInsurancesService from '@modules/insurances/services/ListInsurancesService';
import UpdateInsuranceService from '@modules/insurances/services/UpdateInsuranceService';
import DeleteInsuranceService from '@modules/insurances/services/DeleteInsuranceService';

export default class InsuranceController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { insurance, cnpj } = request.body;

    const insuranceToCreate = container.resolve(CreateInsuranceService);

    const insuranceCreated = await insuranceToCreate.execute({
      insurance,
      cnpj,
    });

    return response.json(insuranceCreated);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listInsurances = container.resolve(ListInsurancesService);

    const insurances = await listInsurances.execute();

    return response.json(insurances);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const insurance_id = request.params.id;
    const { insurance, cnpj } = request.body;

    const insuranceToUpdate = container.resolve(UpdateInsuranceService);

    const insuranceUpdated = await insuranceToUpdate.execute({
      insurance_id,
      insurance,
      cnpj,
    });

    return response.json(insuranceUpdated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const insurance_id = request.params.id;

    const insuranceToDelete = container.resolve(DeleteInsuranceService);

    const insuranceDeleted = await insuranceToDelete.execute({
      insurance_id,
    });

    return response.json(insuranceDeleted);
  }
}
