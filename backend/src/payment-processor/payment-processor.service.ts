import { Injectable } from '@nestjs/common';
import {
  CreatePaymentBodyDto,
  ExpirePaymentDto,
} from 'src/payment/payment.dto';
import { StripeProcessorService } from './stripe-processor/stripe-processor.service';
import { PaymentProcessor } from './payment-processor.interface';
import { PaymentProcessorError } from './payment-processor.error';

@Injectable()
export class PaymentProcessorService {
  constructor(private readonly stripeProcessor: StripeProcessorService) {}

  async createPayment(
    data: CreatePaymentBodyDto,
  ): Promise<
    ReturnType<PaymentProcessor['createPayment']> | PaymentProcessorError
  > {
    if (data.provider === 'STRIPE') {
      return this.stripeProcessor.createPayment(data);
    }
    throw new Error(`Unsupported payment provider ${data.provider} received`);
  }

  async expirePayment(data: ExpirePaymentDto): Promise<void> {
    if (data.provider === 'STRIPE') {
      return this.stripeProcessor.expirePayment(data);
    }
    throw new Error(`Unsupported payment provider ${data.provider} received`);
  }
}
