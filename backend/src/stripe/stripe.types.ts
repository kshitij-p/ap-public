import Stripe from 'stripe';
import { type ConfigEnvSchema } from 'src/config/config.schema';

export type StripeModuleParams =
  | string
  | { key: string }
  | { configEnvKey: keyof ConfigEnvSchema };

export type StripeModuleOptions = {
  stripeConfig?: Stripe.StripeConfig;
  global?: boolean;
};
