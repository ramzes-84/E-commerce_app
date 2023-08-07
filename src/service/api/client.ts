import { ctpClient } from './BuildClient'
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY || '{projectKey}',
})

// Example function to check API params
export const getCustomers = async () => {
  const customersList = await apiRoot.customers().get().execute()
  return customersList
}
