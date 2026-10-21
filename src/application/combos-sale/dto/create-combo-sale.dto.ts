import {
    IsUUID,
    IsInt,
    Min,
} from 'class-validator';

export class CreateComboSaleDto {

    @IsUUID()
    comboId: string;

    @IsInt()
    @Min(1)
    totalUnits: number;

}