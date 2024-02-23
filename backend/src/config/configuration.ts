import { getEnv } from './config.utils';

export default () => {
  const env = getEnv();

  return env;
};
