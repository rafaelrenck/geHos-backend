import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  tmp_password: boolean;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  hr_id: number;

  @Column()
  cpf: string;

  @Column()
  board: string;

  @Column()
  board_uf: string;

  @Column()
  board_id: number;

  @Column()
  avatar: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
