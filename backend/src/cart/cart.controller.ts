import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartBodyDto } from './cart.dto';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('/get')
  async getCart() {
    const cart = await this.prisma.cart.findFirst({
      include: {
        CartItem: true,
      },
    });
    return { cart };
  }

  @Post('/update')
  async updateCart(@Body() body: AddToCartBodyDto) {
    let cart = await this.prisma.cart.findFirst({});

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {},
      });
    }

    if (body.quantity) {
      await this.cartService.updateOrCreateInCart(
        cart.id,
        body.productId,
        body.quantity,
      );
    } else {
      await this.cartService.removeFromCart(cart.id, body.productId);
    }

    const updatedCart = await this.prisma.cart.findUnique({
      where: {
        id: cart.id,
      },
      include: {
        CartItem: true,
      },
    });

    return {
      message: 'Successfully updated cart',
      cart: updatedCart,
    };
  }
}
