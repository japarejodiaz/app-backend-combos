import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ComboRepository }
  from '../../../domain/combo/repositories/combo.repository';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

import { UpdateComboDto }
  from '../dto/update-combo.dto';

@Injectable()
export class UpdateComboUseCase {

  constructor(
    private readonly repository:
    ComboRepository,
  ) {}

  async execute(
    currentUser: any,
    id: string,
    dto: UpdateComboDto,
  ) {

    const combo =
      currentUser.role ===
      UserRole.SUPER_ADMIN

        ? await this.repository.findById(
          id,
        )

        : await this.repository.findByCompanyAndId(
          currentUser.companyId,
          id,
        );

    if (!combo) {

      throw new NotFoundException(
        'Combo not found',
      );

    }

    if (
      dto.code &&
      dto.code !== combo.code
    ) {

      const existing =
        await this.repository.findByCode(
          combo.companyId,
          dto.code,
        );

      if (
        existing &&
        existing.id !== combo.id
      ) {

        throw new ConflictException(
          'Combo code already exists',
        );

      }

      combo.code = dto.code;

    }

    if (dto.name) {
      combo.name = dto.name;
    }

    if (
      dto.description !== undefined
    ) {
      combo.description =
        dto.description;
    }

    return this.repository.update(
      combo,
    );

  }

}