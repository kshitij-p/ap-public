import { z, TypeOf } from 'zod';
import {
  DATABASE_URL_CONST,
  NODE_ENV_CONST,
  PORT_CONST,
  SERVER_URL_CONST,
  STRIPE_API_KEY_CONST,
  STRIPE_CLI_TOKEN_CONST,
  STRIPE_WEBHOOK_SECRET_CONST,
} from './config.constants';

export const configEnvSchema = z.object({
  [NODE_ENV_CONST]: z
    .enum(['development', 'production', 'staging'])
    .default('development'),
  [PORT_CONST]: z
    .string()
    .transform((port) => parseInt(port))
    .pipe(z.literal(3001)),

  [STRIPE_API_KEY_CONST]: z.string().min(1),
  [STRIPE_CLI_TOKEN_CONST]: z.string().min(1),

  [STRIPE_WEBHOOK_SECRET_CONST]: z.string().min(1),

  [DATABASE_URL_CONST]: z.string().min(1),

  [SERVER_URL_CONST]: z.string().min(1),
});

export type ConfigEnvSchema = TypeOf<typeof configEnvSchema>;
