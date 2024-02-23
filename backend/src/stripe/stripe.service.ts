import { Injectable } from '@nestjs/common';
import { CreatePaymentBodyDto } from 'src/payment/payment.dto';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;

  constructor(stripe: Stripe) {
    this.stripe = stripe;
  }

  async createPayment(
    data: CreatePaymentBodyDto['items'],
    options: Omit<Stripe.Checkout.SessionCreateParams, 'line_items'>,
  ) {
    const lineItems = await Promise.all(
      data.map(async (item) => {
        let priceId = (await this.stripe.products.retrieve(item.productId))
          .default_price;
        if (!priceId)
          throw new Error(`Failed to get price for product ${item.productId}`);

        if (typeof priceId !== 'string') {
          priceId = priceId.id;
        }

        return {
          quantity: item.quantity,
          price: priceId,
        };
      }),
    );

    return this.stripe.checkout.sessions.create({
      ...options,
      line_items: lineItems,
    });
  }

  async expirePaymentById(
    id: string,
    options?: Stripe.Checkout.SessionExpireParams,
  ) {
    return this.stripe.checkout.sessions.expire(id, options);
  }

  getWebhook(signature: string, body: string | Buffer, endpointSecret: string) {
    const event = this.stripe.webhooks.constructEvent(
      body,
      signature,
      endpointSecret,
    );

    if (!event) throw new Error('Failed to generate event');
    return event;
  }
}
