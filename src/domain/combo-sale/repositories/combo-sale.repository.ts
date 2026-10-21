import { ComboSale } from '../entities/combo-sale.entity';

export abstract class ComboSaleRepository {

    abstract create(
        comboSale: ComboSale,
    ): Promise<ComboSale>;

    abstract findById(
        id: string,
    ): Promise<ComboSale | null>;

}