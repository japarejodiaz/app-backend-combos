import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('combos')
export class ComboOrmEntity {

  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'company_id',
    type: 'uuid',
  })
  companyId: string;

  @Column({
    length: 20,
  })
  code: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string | null;

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