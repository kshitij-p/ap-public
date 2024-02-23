import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addToCart(cartId: string, productId: string, quantity: number) {
    return this.prisma.cartItem.create({
      data: {
        cartId: cartId,
        productId: productId,
        quantity: quantity,
      },
    });
  }

  async updateCartItem(cartItemId: string, quantity: number) {
    return this.prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: quantity,
      },
    });
  }

  async updateOrCreateInCart(
    cartId: string,
    productId: string,
    quantity: number,
  ) {
    let cartItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cartId,
        productId: productId,
      },
    });

    if (cartItem) {
      cartItem = await this.updateCartItem(cartItem.id, quantity);
    } else {
      cartItem = await this.addToCart(cartId, productId, quantity);
      return cartItem;
    }
  }

  async removeFromCart(cartId: string, productId: string) {
    return this.prisma.cartItem.deleteMany({
      where: {
        cartId,
        productId,
      },
    });
  }
}
