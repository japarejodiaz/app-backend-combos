import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

import { DiningTableRepository }
  from '../../../domain/table/repositories/dining-table.repository';

import { UpdateTableDto }
  from '../dto/update-table.dto';

@Injectable()
export class UpdateTableUseCase {

  constructor(
    private readonly repository:
    DiningTableRepository,
  ) {}

  async execute(
    currentUser: any,
    id: string,
    dto: UpdateTableDto,
  ) {

    const table =
      currentUser.role ===
      UserRole.SUPER_ADMIN

        ? await this.repository.findById(
          id,
        )

        : await this.repository.findByCompanyAndId(
          currentUser.companyId,
          id,
        );

    if (!table) {

      throw new NotFoundException(
        'Table not found',
      );

    }

    if (
      dto.code &&
      dto.code !== table.code
    ) {

      const existing =
        await this.repository.findByCode(
          table.companyId,
          dto.code,
        );

      if (
        existing &&
        existing.id !== table.id
      ) {

        throw new ConflictException(
          'Table code already exists',
        );

      }

      table.code = dto.code;

    }

    if (dto.name) {
      table.name = dto.name;
    }

    if (dto.capacity) {
      table.capacity =
        dto.capacity;
    }

    return this.repository.update(
      table,
    );

  }

}