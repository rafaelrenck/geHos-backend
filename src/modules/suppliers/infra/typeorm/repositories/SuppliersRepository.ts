import { getRepository, Repository } from 'typeorm';

import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import ISupplierDTO from '@modules/suppliers/dtos/ISupplierDTO';
import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

class SuppliersRepository implements ISuppliersRepository {
  private ormRepository: Repository<Supplier>;

  constructor() {
    this.ormRepository = getRepository(Supplier);
  }

  public async findAll(): Promise<Supplier[]> {
    const suppliers = await this.ormRepository.find();

    return suppliers;
  }

  public async findById(id: string): Promise<Supplier | undefined> {
    const supplier = await this.ormRepository.findOne(id);

    return supplier;
  }

  public async findBySupplier(supplier: string): Promise<Supplier | undefined> {
    const findSupplier = await this.ormRepository.findOne({
      where: { supplier },
    });

    return findSupplier;
  }

  public async create(supplierData: ISupplierDTO): Promise<Supplier> {
    const supplier = this.ormRepository.create(supplierData);

    await this.ormRepository.save(supplier);

    return supplier;
  }

  public async save(supplier: Supplier): Promise<Supplier> {
    return this.ormRepository.save(supplier);
  }
}

export default SuppliersRepository;
