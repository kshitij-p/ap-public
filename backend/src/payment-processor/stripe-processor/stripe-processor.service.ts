import { Injectable } from '@nestjs/common';
import { PaymentProcessor } from 'src/payment-processor/payment-processor.interface';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class StripeProcessorService implements PaymentProcessor {
  constructor(private readonly stripeService: StripeService) {}

  createPayment: PaymentProcessor['createPayment'] = async (data) => {
    const checkout = await this.stripeService.createPayment(data.items, {
      mode: 'payment',
      payment_method_types: ['card'],

      success_url: data.successUrl,
    });

    return {
      provider: 'STRIPE',
      providerId: checkout.id,
      status: 'PENDING',
      checkoutUrl: checkout.url,
      expiresAt: new Date(checkout.expires_at * 1000),
    };
  };

  expirePayment: PaymentProcessor['expirePayment'] = async (data) => {
    await this.stripeService.expirePaymentById(data.providerId);
  };
}
