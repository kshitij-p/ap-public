import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentBodyDto } from './payment.dto';
import { PaymentProcessorService } from 'src/payment-processor/payment-processor.service';
import {
  PaymentProcessorError,
  UnsupportedPaymentProcessor,
} from 'src/payment-processor/payment-processor.error';
import { PaymentProvider } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentProcessorService: PaymentProcessorService,
  ) {}

  #formatPaymentProcessorError(error: Error | PaymentProcessorError) {
    if (!(error instanceof PaymentProcessorError)) return error;

    if (error instanceof UnsupportedPaymentProcessor)
      return BadRequestException;

    return error;
  }

  async createPayment(data: CreatePaymentBodyDto) {
    const checkout = await this.paymentProcessorService.createPayment(data);

    if (checkout instanceof Error) {
      throw this.#formatPaymentProcessorError(checkout);
    }

    const payment = await this.prisma.payment.create({
      data: checkout,
    });

    return payment;
  }

  async expirePaymentById(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) throw new NotFoundException();

    await this.paymentProcessorService.expirePayment({
      id: payment.id,
      provider: payment.provider,
      providerId: payment.providerId,
    });

    return payment;
  }

  async markAsExpired(provider: PaymentProvider, providerId: string) {
    return this.prisma.payment.update({
      where: { provider, providerId },
      data: { status: 'EXPIRED', expiresAt: null, checkoutUrl: null },
    });
  }

  async markAsSucceeded(provider: PaymentProvider, providerId: string) {
    return this.prisma.payment.update({
      where: { providerId, provider },
      data: { status: 'SUCCESS', expiresAt: null, checkoutUrl: null },
    });
  }

  async listPayments() {
    return this.prisma.payment.findMany({
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
    });
  }
}
