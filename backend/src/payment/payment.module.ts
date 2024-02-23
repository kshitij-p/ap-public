import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentProcessorModule } from 'src/payment-processor/payment-processor.module';

@Module({
  imports: [PaymentProcessorModule],
  providers: [PrismaService, PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
