import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

interface IRequest {
  supplier_id: string;
}

@injectable()
class DeleteSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute({ supplier_id }: IRequest): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findById(supplier_id);

    if (!supplier) {
      throw new AppError('Fornecedor não encontrado');
    }

    supplier.active = false;

    return this.suppliersRepository.save(supplier);
  }
}

export default DeleteSupplierService;
