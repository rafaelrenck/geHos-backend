import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity('suppliers')
export default class Suppliers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('increment')
  code: number;

  @Column()
  supplier: string;

  @Column()
  fake_name: string;

  @Column()
  cnpj: string;

  @Column()
  ie: string;

  @Column()
  telephone: string;

  @Column()
  email: string;

  @Column()
  agent: string;

  @Column()
  bank: string;

  @Column()
  agency: string;

  @Column()
  account: string;

  @Column('varchar', { nullable: true })
  logo: string | null = null;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
