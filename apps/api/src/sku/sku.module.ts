import { Module } from '@nestjs/common';
import { SkuService } from './sku.service';
import { SkuController } from './sku.controller';
import { SkuStateService } from './sku-state.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SkuController],
  providers: [SkuService, SkuStateService],
})
export class SkuModule {}
