import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity('patients')
export default class Patients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('increment')
  code: number;

  @Column()
  patient: string;

  @Column()
  gender: string;

  @CreateDateColumn()
  date_of_birth: Date;

  @Column()
  mom: string;

  @Column()
  dad: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  cns: string;

  @Column()
  telephone: string;

  @Column()
  email: string;

  @Column('varchar', { nullable: true })
  photo: string | null = null;

  @CreateDateColumn()
  date_of_death: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
