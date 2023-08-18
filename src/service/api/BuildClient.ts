import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type UserAuthOptions,
  TokenCacheOptions,
  TokenStore,
  TokenCache, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = process.env.CTP_PROJECT_KEY || '{projectKey}';
const scopes = process.env.CTP_SCOPES?.split(' ').map((item) => item) || ['{scope}'];
const tokenCacheOptions: TokenCacheOptions = {
  clientId: process.env.CTP_CLIENT_ID || '{clientID}',
  projectKey,
  host: process.env.CTP_AUTH_URL || 'https://auth.{region}.commercetools.com',
};

let localTokenCacheValue: TokenStore;

const tokenCache: TokenCache = {
  get(tokenCacheOptions: TokenCacheOptions | undefined): TokenStore {
    return localTokenCacheValue;
  },

  set(cache: TokenStore, tokenCacheOptions: TokenCacheOptions | undefined): void {
    console.log('TokenStore: ', cache);
    localTokenCacheValue = cache;
  },
};

export const createApiRoot = function (userCredentials?: UserAuthOptions) {
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: process.env.CTP_API_URL || 'https://api.{region}.commercetools.com',
    fetch,
  };

  let apiRoot: ApiRoot;

  if (userCredentials) {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: process.env.CTP_AUTH_URL || 'https://auth.{region}.commercetools.com',
      projectKey: projectKey,
      credentials: {
        clientId: process.env.CTP_CLIENT_ID || '{clientID}',
        clientSecret: process.env.CTP_CLIENT_SECRET || '{clientSecret}',
        user: userCredentials,
      },
      scopes,
      // tokenCache,
    };
    const ctpClient = new ClientBuilder()
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    apiRoot = createApiBuilderFromCtpClient(ctpClient);
    return apiRoot.withProjectKey({
      projectKey: process.env.CTP_PROJECT_KEY || '{projectKey}',
    });
  }

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: process.env.CTP_AUTH_URL || 'https://auth.{region}.commercetools.com',
    projectKey: projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID || '{clientID}',
      clientSecret: process.env.CTP_CLIENT_SECRET || '{clientSecret}',
    },
    scopes,
    // tokenCache,
  };

  const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  apiRoot = createApiBuilderFromCtpClient(ctpClient);

  return apiRoot.withProjectKey({
    projectKey: process.env.CTP_PROJECT_KEY || '{projectKey}',
  });
};
