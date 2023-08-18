import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { createApiRoot } from './BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

const userCredentials: UserAuthOptions = { username: 'test@t.ru', password: 'test' };

export let apiRoot: ByProjectKeyRequestBuilder = createApiRoot();
import { IFormData } from '@/app/registration/page';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export const turnOnPasswordMode = (userCredentials: UserAuthOptions) => {
  apiRoot = createApiRoot(userCredentials);
};

export const turnOffPasswordMode = () => {
  apiRoot = createApiRoot();
};

interface CustomerDraft {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  addresses?: {
    streetName?: string;
    city?: string;
    postalCode?: string;
    country: string;
  }[];
}

export const registerUser = async (formData: IFormData, apiTestRoot?: { customers: () => { post: jest.Mock } }) => {
  const customerDraft: CustomerDraft = {
    email: formData.email,
    password: formData.password,
    firstName: formData.firstName,
    lastName: formData.lastName,
    dateOfBirth: formData.dateOfBirth,
    addresses: [
      {
        streetName: formData.streetName,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
    ],
  };

  const response = await apiRoot.customers().post({ body: customerDraft });
  console.log(response);
};
