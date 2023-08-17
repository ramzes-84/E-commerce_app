import { IFormData } from '@/app/registration/page'
import { ctpClient } from './BuildClient'
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'cyber-ducks-app',
})

// Example function to check API params
export const getCustomers = async () => {
  const customersList = await apiRoot.customers().get().execute()
  return customersList
}

interface CustomerDraft {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  addresses?: {
    streetName?: string
    city?: string
    postalCode?: string
    country: string
  }[]
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
  }

  const response = await apiRoot.customers().post({ body: customerDraft })
  console.log(response)
}
