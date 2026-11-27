import { Injectable } from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import { CustomerOrder }
  from '../../../../domain/order/entities/customer-order.entity';

import { OrderStatus }
  from '../../../../domain/order/enums/order-status.enum';

import { CustomerOrderRepository }
  from '../../../../domain/order/repositories/customer-order.repository';

import { CustomerOrderOrmEntity }
  from '../entities/customer-order.orm-entity';

@Injectable()
export class PostgresCustomerOrderRepository
  implements CustomerOrderRepository
{
  constructor(
    @InjectRepository(
      CustomerOrderOrmEntity,
    )
    private readonly repository:
    Repository<CustomerOrderOrmEntity>,
  ) {}

  async create(
    order: CustomerOrder,
  ): Promise<CustomerOrder> {

    const entity =
      this.repository.create({

        id: order.id,

        companyId:
        order.companyId,

        tableId:
        order.tableId,

        orderNumber:
        order.orderNumber,

        status:
        order.status,

        openedBy:
        order.openedBy,

        openedAt:
        order.openedAt,

        closedAt:
        order.closedAt,

      });

    await this.repository.save(
      entity,
    );

    return order;

  }

  async findAll(): Promise<CustomerOrder[]> {
    const entities = await this.repository.find({
      order: {
        openedAt: 'DESC',
      },
    });

    return entities.map(
      entity =>
        this.toDomain(entity),
    );
  }

  async findByCompanyAndId(
    companyId: string,
    id: string,
  ): Promise<CustomerOrder | null> {

    const entity =
      await this.repository.findOne({

        where: {
          companyId,
          id,
        },

      });

    return entity
      ? this.toDomain(entity)
      : null;

  }

  async findById(
    id: string,
  ): Promise<CustomerOrder | null> {

    const entity =
      await this.repository.findOne({

        where: {
          id,
        },

      });

    return entity
      ? this.toDomain(entity)
      : null;

  }

  async findByCompanyId(
    companyId: string,
  ): Promise<CustomerOrder[]> {

    const entities =
      await this.repository.find({

        where: {
          companyId,
        },

        order: {
          openedAt: 'DESC',
        },

      });

    return entities.map(
      entity =>
        this.toDomain(entity),
    );

  }

  async update(
    order: CustomerOrder,
  ): Promise<CustomerOrder> {

    await this.repository.update(
      order.id,
      {
        status: order.status,
        closedAt:
        order.closedAt,
      },
    );

    return order;

  }

  async findOpenByTable(
    companyId: string,
    tableId: string,
  ): Promise<CustomerOrder | null> {

    const entity =
      await this.repository.findOne({

        where: {

          companyId,

          tableId,

          status:
          OrderStatus.OPEN,

        },

      });

    return entity
      ? this.toDomain(entity)
      : null;

  }

  async getNextOrderNumber(
    companyId: string,
  ): Promise<string> {

    const lastOrder =
      await this.repository.findOne({

        where: {
          companyId,
        },

        order: {
          orderNumber: 'DESC',
        },

      });

    if (!lastOrder) {

      return 'CMD-000001';

    }

    const current =
      Number(
        lastOrder.orderNumber
          .replace('CMD-', ''),
      );

    const next =
      current + 1;

    return `CMD-${String(next)
      .padStart(6, '0')}`;

  }

  private toDomain(
    entity:
    CustomerOrderOrmEntity,
  ): CustomerOrder {

    return new CustomerOrder(

      entity.id,

      entity.companyId,

      entity.tableId,

      entity.orderNumber,

      entity.status as OrderStatus,

      entity.openedBy,

      entity.openedAt,

      entity.closedAt,

    );

  }

  async findByCompanyAndNumber(
    companyId: string,
    orderNumber: string,
  ): Promise<CustomerOrder | null> {

    const entity =
      await this.repository.findOne({

        where: {
          companyId,
          orderNumber,
        },

      });

    return entity
      ? this.toDomain(entity)
      : null;

  }


}