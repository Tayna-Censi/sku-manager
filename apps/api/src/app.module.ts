import { Module } from '@nestjs/common';
import { SkuModule } from './sku/sku.module';
import { PrismaService } from './prisma/prisma.service';
@Module({
  imports: [SkuModule],
  providers: [PrismaService],
})
export class AppModule {}
