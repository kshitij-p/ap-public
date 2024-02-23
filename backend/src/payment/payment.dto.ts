import { PaymentProvider } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const paymentProviderSchema = z.enum(['STRIPE']);

export const CreatePaymentSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().min(1),
      }),
    )
    .min(1),
  successUrl: z.string().min(1),
  provider: paymentProviderSchema,
});

export class CreatePaymentBodyDto extends createZodDto(CreatePaymentSchema) {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  successUrl: string;
  provider: PaymentProvider;
}

export const ExpirePaymentSchema = z.object({
  id: z.string().min(1),
  providerId: z.string().min(1),
  provider: paymentProviderSchema,
});

export class ExpirePaymentDto {
  id: string;
  providerId: string;
  provider: PaymentProvider;
}
