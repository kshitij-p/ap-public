import { Module } from '@nestjs/common';
import { StripeProcessorService } from './stripe-processor.service';

@Module({
  providers: [StripeProcessorService],
  exports: [StripeProcessorService],
})
export class StripeProcessorModule {}
