import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  async listProducts() {
    const products = await this.productService.listProducts({
      orderBy: [{ name: 'asc' }, { id: 'asc' }],
    });
    return { products };
  }

  @Get('/:id/get')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct({ where: { id } });
    return { product };
  }
}
