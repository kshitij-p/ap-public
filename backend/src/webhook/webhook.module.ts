import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentModule } from 'src/payment/payment.module';
import { WebhookService } from './webhook.service';
import { PaymentProcessorModule } from 'src/payment-processor/payment-processor.module';

@Module({
  imports: [PaymentModule, PaymentProcessorModule],
  controllers: [WebhookController],
  providers: [PrismaService, WebhookService, PaymentService],
})
export class WebhookModule {}
