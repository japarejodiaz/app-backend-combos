import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
export class CompanyOrmEntity {

  @PrimaryColumn('uuid')
  id: string;

  @Column({
    length: 20,
    unique: true,
  })
  code: string;

  @Column({
    length: 150,
  })
  name: string;

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