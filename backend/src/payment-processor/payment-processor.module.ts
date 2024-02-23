import { Module } from '@nestjs/common';
import { PaymentProcessorService } from './payment-processor.service';
import { StripeProcessorModule } from './stripe-processor/stripe-processor.module';

@Module({
  imports: [StripeProcessorModule],
  providers: [PaymentProcessorService],
  exports: [PaymentProcessorService, StripeProcessorModule],
})
export class PaymentProcessorModule {}
