import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { createApiRoot } from './BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export let apiRoot: ByProjectKeyRequestBuilder = createApiRoot();

export const turnOnPasswordMode = (userCredentials: UserAuthOptions) => {
  apiRoot = createApiRoot(userCredentials);
};

export const turnOffPasswordMode = () => {
  apiRoot = createApiRoot();
};
