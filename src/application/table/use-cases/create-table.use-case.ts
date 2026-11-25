import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { randomUUID } from 'crypto';

import { DiningTable }
  from '../../../domain/table/entities/dining-table.entity';

import { DiningTableRepository }
  from '../../../domain/table/repositories/dining-table.repository';

import { CreateTableDto }
  from '../dto/create-table.dto';

@Injectable()
export class CreateTableUseCase {

  constructor(
    private readonly repository:
    DiningTableRepository,
  ) {}

  async execute(
    currentUser: any,
    dto: CreateTableDto,
  ) {

    const existingTable =
      await this.repository.findByCode(
        currentUser.companyId,
        dto.code,
      );

    if (existingTable) {

      throw new ConflictException(
        'Table code already exists',
      );

    }

    const table =
      new DiningTable(
        randomUUID(),
        currentUser.companyId,
        dto.code,
        dto.name,
        dto.capacity,
        true,
      );

    return this.repository.create(
      table,
    );

  }

}