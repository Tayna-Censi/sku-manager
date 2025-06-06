import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SkuService } from './sku.service';

@Controller('skus')
export class SkuController {
  constructor(private readonly skuService: SkuService) {}

  @Post()
  create(@Body() dto: any) {
    return this.skuService.create(dto);
  }

  @Get()
  findAll() {
    return this.skuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skuService.findOne(id);
  }

  @Get(':id')
    async getSku(
      @Param('id') id: string,
      @Query('allStatuses') allStatuses?: string,
    ) {
    const includeAll = allStatuses === 'true';
    return this.skuService.findOne(id, { allStatuses: includeAll });
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: any) {
    return this.skuService.updateStatus(id, dto.status);
  }
}
