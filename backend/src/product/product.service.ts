import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async listProducts(params: Prisma.ProductFindManyArgs = {}) {
    return this.prisma.product.findMany(params);
  }

  async findProduct(params: Prisma.ProductFindFirstArgs) {
    return this.prisma.product.findFirst(params);
  }

  async getProduct(params: Prisma.ProductFindUniqueArgs) {
    return this.prisma.product.findUnique(params);
  }
}
