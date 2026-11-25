import {
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('combo_sales')
export class ComboSaleOrmEntity {

    @PrimaryColumn('uuid')
    id: string;

    @Column({
        type: 'uuid',
        name: 'combo_id',
    })
    comboId: string;

    @Column({
        name: 'total_units',
    })
    totalUnits: number;

    @Column({
        name: 'delivered_units',
        default: 0,
    })
    deliveredUnits: number;

    @Column({
        length: 20,
    })
    status: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    @Column({
        name: 'company_id',
        type: 'uuid',
    })
    companyId: string;

    @Column({
        name: 'order_id',
        type: 'uuid',
        nullable: true,
    })
    orderId: string | null;
}