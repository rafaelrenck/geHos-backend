import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupplierService from '@modules/suppliers/services/CreateSupplierService';
import ListSuppliersService from '@modules/suppliers/services/ListSuppliersService';
import UpdateSupplierService from '@modules/suppliers/services/UpdateSupplierService';
import DeleteSupplierService from '@modules/suppliers/services/DeleteSupplierService';

export default class SuppliersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      supplier,
      fake_name,
      cnpj,
      ie,
      telephone,
      email,
      agent,
      bank,
      agency,
      account,
    } = request.body;

    const supplierToCreate = container.resolve(CreateSupplierService);

    const supplierCreated = await supplierToCreate.execute({
      supplier,
      fake_name,
      cnpj,
      ie,
      telephone,
      email,
      agent,
      bank,
      agency,
      account,
    });

    return response.json(supplierCreated);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listSuppliers = container.resolve(ListSuppliersService);

    const suppliers = await listSuppliers.execute();

    return response.json(suppliers);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const supplier_id = request.params.id;
    const {
      supplier,
      fake_name,
      cnpj,
      ie,
      telephone,
      email,
      agent,
      bank,
      agency,
      account,
    } = request.body;

    const supplierToUpdate = container.resolve(UpdateSupplierService);

    const supplierUpdated = await supplierToUpdate.execute({
      supplier_id,
      supplier,
      fake_name,
      cnpj,
      ie,
      telephone,
      email,
      agent,
      bank,
      agency,
      account,
    });

    return response.json(supplierUpdated);
  }

  public async inactivate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const supplier_id = request.params.id;

    const supplierToInactivate = container.resolve(DeleteSupplierService);

    const supplierInactivated = await supplierToInactivate.execute({
      supplier_id,
    });

    return response.json(supplierInactivated);
  }
}
