import fetch from 'node-fetch'
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2'

const projectKey = 'cyber-ducks-app'
const scopes = process.env.CTP_SCOPES?.split(' ').map((item) => item) || ['manage_project:cyber-ducks-app']

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: '3at1oL0-vzq_T_uT5VxRZFIr',
    clientSecret: 'FLOVl-K13DJovX_6B7FWrLm83TNV3Xom',
  },
  scopes,
  fetch,
}

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
}

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build()
