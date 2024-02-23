export type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  priceInr: number;
};

export const PaymentProviders = ["STRIPE"] as const;

export type PaymentProvider = (typeof PaymentProviders)[number];

export const PaymentStatuses = ["EXPIRED", "SUCCESS", "PENDING"];
export type PaymentStatus = (typeof PaymentStatuses)[number];

export type Payment = {
  id: string;
  provider: PaymentProvider;
  providerId: string;
  status: PaymentStatus;
  createdAt: Date | null;
  checkoutUrl: string | null;
  expiresAt: Date | null;
};
