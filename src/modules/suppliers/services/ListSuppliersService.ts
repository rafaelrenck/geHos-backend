import { injectable, inject } from 'tsyringe';

import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';

import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

@injectable()
class ListSuppliersService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(): Promise<Supplier[]> {
    const suppliers = await this.suppliersRepository.findAll();

    return suppliers;
  }
}

export default ListSuppliersService;
