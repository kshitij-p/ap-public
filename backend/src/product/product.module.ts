import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [],
  providers: [PrismaService, ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
