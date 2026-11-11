import {
    IsUUID,
    IsInt,
    Min,
} from 'class-validator';

export class CreateComboSaleDto {

   /* @IsUUID()
    companyId: string;*/

    @IsUUID()
    comboId: string;

    @IsInt()
    @Min(1)
    totalUnits: number;

}