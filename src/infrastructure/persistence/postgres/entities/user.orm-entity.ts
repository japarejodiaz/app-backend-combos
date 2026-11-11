import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserOrmEntity {

  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'company_id',
    type: 'uuid',
  })
  companyId: string;

  @Column({
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    length: 150,
    unique: true,
  })
  email: string;

  @Column({
    length: 255,
  })
  password: string;

  @Column({
    length: 30,
  })
  role: string;

  @Column({
    default: true,
  })
  active: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

}