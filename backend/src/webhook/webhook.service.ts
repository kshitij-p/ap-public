import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/payment/payment.service';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly paymentService: PaymentService,
  ) {}
  async processStripeWebhook(
    signature: string,
    body: Buffer,
    webhookSecret: string,
  ) {
    const event = this.stripeService.getWebhook(signature, body, webhookSecret);

    switch (event.type) {
      case 'checkout.session.completed': {
        const { id: checkoutId } = event.data.object;
        await this.paymentService.markAsSucceeded('STRIPE', checkoutId);
        break;
      }

      case 'checkout.session.expired': {
        const { id: checkoutId } = event.data.object;
        await this.paymentService.markAsExpired('STRIPE', checkoutId);
        break;
      }
    }
  }
}
