import kyClient, { Options } from "ky";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const getApiUrl = (url: string) => {
  return `${SERVER_URL}${url}`;
};

const ky = kyClient.create({
  retry: {
    limit: 0,
    methods: [],
  },
  timeout: 30_000,
});

export const fetch = {
  get: (url: string, options?: Options) => ky.get(getApiUrl(url), options),
  post: (url: string, options?: Options) => ky.post(getApiUrl(url), options),
  patch: (url: string, options?: Options) => ky.patch(getApiUrl(url), options),
  put: (url: string, options?: Options) => ky.put(getApiUrl(url), options),
  delete: (url: string, options?: Options) =>
    ky.delete(getApiUrl(url), options),
};
