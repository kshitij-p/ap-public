import { PaymentProvider, PaymentStatus } from '@prisma/client';
import {
  ExpirePaymentDto,
  CreatePaymentBodyDto,
} from 'src/payment/payment.dto';

export interface PaymentProcessor {
  createPayment: (data: CreatePaymentBodyDto) => Promise<{
    provider: PaymentProvider;
    providerId: string;
    status: PaymentStatus;
    checkoutUrl?: string | null;
    expiresAt?: Date;
  }>;
  expirePayment: (data: ExpirePaymentDto) => Promise<void>;
}
