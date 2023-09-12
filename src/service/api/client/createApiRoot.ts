import { ClientBuilder, type UserAuthOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import SessionTokenCache from '@/service/api/client/token-storage';
import getApiOptions from '@/service/api/client/config';
import ServerSessionDataStorage from '@/controller/session/server/ServerSessionDataStorage';

const createApiRoot = function (userCredentials?: UserAuthOptions) {
  const { projectKey, scopes, host, authHost, clientId, clientSecret } = getApiOptions();
  const tokenCache = new SessionTokenCache();
  const storage = new ServerSessionDataStorage();
  const session = storage.getData();

  let builder = new ClientBuilder();
  if (userCredentials) {
    session.anonymousId = undefined;
    tokenCache.set({ token: '', expirationTime: -1 });
    builder = builder.withPasswordFlow({
      host: authHost,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
        user: userCredentials,
      },
      scopes,
      tokenCache,
    });
  } else if (session.customerId || session.anonymousId) {
    builder = builder.withExistingTokenFlow(`Bearer ${tokenCache.get().token}`, { force: true });
  } else {
    builder = builder.withAnonymousSessionFlow({
      host: authHost,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes,
      tokenCache,
    });
  }

  return createApiBuilderFromCtpClient(
    builder.withHttpMiddleware({ host }).withLoggerMiddleware().build()
  ).withProjectKey({ projectKey });
};

export default createApiRoot;
