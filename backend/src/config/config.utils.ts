import { configEnvSchema } from './config.schema';

export const getEnv = () => {
  return configEnvSchema.parse(process.env);
};
