import { ComboSaleStatus } from '../enums/combo-sale-status.enum';

export class ComboSale {

    constructor(
        public readonly id: string,
        public readonly companyId: string,
        public readonly comboId: string,

        public totalUnits: number,

        public deliveredUnits: number,

        public status: ComboSaleStatus,
    ) {}

    get pendingUnits(): number {
        return this.totalUnits - this.deliveredUnits;
    }

}