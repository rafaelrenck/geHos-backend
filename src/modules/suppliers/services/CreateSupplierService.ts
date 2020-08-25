import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

interface IRequest {
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
class CreateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute({
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
    const findSupplier = await this.suppliersRepository.findBySupplier(
      supplier,
    );

    if (findSupplier) {
      throw new AppError('Já existe um fornecedor cadastrado com este nome');
    }

    const supplierCreated = await this.suppliersRepository.create({
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

    return supplierCreated;
  }
}

export default CreateSupplierService;
