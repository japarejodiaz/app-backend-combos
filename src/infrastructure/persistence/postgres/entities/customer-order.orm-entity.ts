import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class CustomerOrderOrmEntity {

  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'company_id',
    type: 'uuid',
  })
  companyId: string;

  @Column({
    name: 'table_id',
    type: 'uuid',
    nullable: true,
  })
  tableId: string | null;

  @Column({
    name: 'order_number',
    length: 20,
  })
  orderNumber: string;

  @Column({
    length: 20,
  })
  status: string;

  @Column({
    name: 'opened_by',
    type: 'uuid',
  })
  openedBy: string;

  @Column({
    name: 'opened_at',
    type: 'timestamp',
  })
  openedAt: Date;

  @Column({
    name: 'closed_at',
    type: 'timestamp',
    nullable: true,
  })
  closedAt: Date | null;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

}