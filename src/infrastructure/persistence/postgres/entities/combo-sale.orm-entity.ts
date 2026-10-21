import {
    Column,
    Entity,
    PrimaryColumn,
} from 'typeorm';

@Entity('combo_sales')
export class ComboSaleOrmEntity {

    @PrimaryColumn('uuid')
    id: string;

    @Column({
        type: 'uuid',
    })
    comboId: string;

    @Column({
        type: 'integer',
    })
    totalUnits: number;

    @Column({
        type: 'integer',
        default: 0,
    })
    deliveredUnits: number;

    @Column({
        length: 20,
    })
    status: string;
}