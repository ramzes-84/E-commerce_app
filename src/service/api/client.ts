import { ctpClient } from './BuildClient'
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY || '{projectKey}',
})

// Example function to check API params
export const getCustomers = async () => {
  const customersList = await apiRoot.customers().get().execute()
  return customersList
}

export interface IFormData {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  streetName: string,
  city: string,
  postalCode: string,
  country: string,
}

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

export const registerUser = async (formData: IFormData)=> {
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

  const response = await apiRoot.customers().post({body: customerDraft});

  return response;
}