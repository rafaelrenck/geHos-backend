import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

interface IRequest {
  supplier_id: string;
  supplier: string;
  fake_name: string;
  cnpj?: string;
  ie?: string;
  telephone?: string;
  email?: string;
  agent?: string;
  bank?: string;
  agency?: string;
  account?: string;
}

@injectable()
class UpdateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute({
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
  }: IRequest): Promise<Supplier> {
    const supplierToUpdate = await this.suppliersRepository.findById(
      supplier_id,
    );

    if (!supplierToUpdate) {
      throw new AppError('Fornecedor não encontrado');
    }

    const supplierExists = await this.suppliersRepository.findBySupplier(
      supplier,
    );

    if (supplierExists && supplierExists.id !== supplier_id) {
      throw new AppError('Já existe um fornecedor cadastrado com este nome');
    }

    supplierToUpdate.supplier = supplier;

    if (fake_name) {
      supplierToUpdate.fake_name = fake_name;
    }

    if (cnpj) {
      supplierToUpdate.cnpj = cnpj;
    }

    if (ie) {
      supplierToUpdate.ie = ie;
    }

    if (telephone) {
      supplierToUpdate.telephone = telephone;
    }

    if (email) {
      supplierToUpdate.email = email;
    }

    if (agent) {
      supplierToUpdate.agent = agent;
    }

    if (bank) {
      supplierToUpdate.bank = bank;
    }

    if (agency) {
      supplierToUpdate.agency = agency;
    }

    if (account) {
      supplierToUpdate.account = account;
    }

    return this.suppliersRepository.save(supplierToUpdate);
  }
}

export default UpdateSupplierService;
