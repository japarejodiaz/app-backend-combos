import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ComboRepository }
  from '../../../domain/combo/repositories/combo.repository';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

@Injectable()
export class DeactivateComboUseCase {

  constructor(
    private readonly repository:
    ComboRepository,
  ) {}

  async execute(
    currentUser: any,
    id: string,
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

    combo.active = false;

    return this.repository.update(
      combo,
    );

  }

}