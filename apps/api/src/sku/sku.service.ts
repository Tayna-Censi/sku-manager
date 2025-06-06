import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SkuStateService } from './sku-state.service';
import { SkuStatus } from './sku-status.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SkuService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stateService: SkuStateService,
  ) {}

  async create(data: any) {
    return this.prisma.sku.create({ data });
  }

  async findAll() {
    return this.prisma.sku.findMany();
  }

  async findOne(id: string, options?: { allStatuses?: boolean }) {
  const sku = await this.prisma.sku.findUnique({ where: { id } });
  if (!sku) {
    throw new NotFoundException('SKU não encontrado');
  }

  let availableStatuses: SkuStatus[];

  if (options?.allStatuses) {
    availableStatuses = this.stateService.getAllStatuses();
  } else {
    availableStatuses = this.stateService.getAllowedTransitions(sku.status as SkuStatus);
  }

  return {
    ...sku,
    availableStatuses,
  };
}

  async updateStatus(id: string, newStatus: SkuStatus) {
    const sku = await this.findOne(id);
    if (!sku) throw new NotFoundException('SKU não encontrado');

    this.stateService.assertTransition(sku.status as SkuStatus, newStatus);

    return this.prisma.sku.update({
      where: { id },
      data: { status: newStatus },
    });
  }
}
