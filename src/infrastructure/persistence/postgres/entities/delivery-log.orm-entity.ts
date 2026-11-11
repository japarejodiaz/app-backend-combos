import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('delivery_logs')
export class DeliveryLogOrmEntity {

  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'combo_sale_id',
    type: 'uuid',
  })
  comboSaleId: string;

  @Column({
    type: 'integer',
  })
  units: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    name: 'company_id',
    type: 'uuid',
  })
  companyId: string;

}