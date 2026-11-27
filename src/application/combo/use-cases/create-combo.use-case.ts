import {

  ConflictException,

  Injectable,

} from '@nestjs/common';

import { randomUUID } from 'crypto';

import { Combo }
  from '../../../domain/combo/entities/combo.entity';

import { ComboRepository }
  from '../../../domain/combo/repositories/combo.repository';

import { CreateComboDto }
  from '../dto/create-combo.dto';

@Injectable()
export class CreateComboUseCase {

  constructor(
    private readonly repository:
    ComboRepository,
  ) {}

  async execute(
    currentUser: any,
    dto: CreateComboDto,
  ) {

    const existing =
      await this.repository
        .findByCode(
          currentUser.companyId,
          dto.code,
        );

    if (existing) {

      throw new ConflictException(
        'Combo code already exists',
      );

    }

    const combo =
      new Combo(

        randomUUID(),

        currentUser.companyId,

        dto.code,

        dto.name,

        dto.description ?? null,

        true,

      );

    return this.repository.create(
      combo,
    );

  }

}