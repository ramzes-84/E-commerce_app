import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

// const projectKey = '{projectKey}';
const projectKey = process.env.CTP_PROJECT_KEY || '{projectKey}';
const scopes = process.env.CTP_SCOPES?.split(' ').map(item => item) || ['{scope}'];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.CTP_AUTH_URL || 'https://auth.{region}.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID || '{clientID}',
    clientSecret: process.env.CTP_CLIENT_SECRET || '{clientSecret}',
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.CTP_API_URL || 'https://api.{region}.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  // .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
