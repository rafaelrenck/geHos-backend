import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import ISupplierDTO from '@modules/suppliers/dtos/ISupplierDTO';

export default interface ISuppliersRepository {
  findAll(): Promise<Supplier[]>;
  findById(id: string): Promise<Supplier | undefined>;
  findBySupplier(supplier: string): Promise<Supplier | undefined>;
  create(data: ISupplierDTO): Promise<Supplier>;
  save(supplier: Supplier): Promise<Supplier>;
}
