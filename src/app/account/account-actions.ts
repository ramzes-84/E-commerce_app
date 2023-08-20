'use server';

import CustomerService from '@/service/api/CustomerService';
import createApiRoot from '@/service/api/client/createApiRoot';

type UserCredentials = { username: string; password: string };
export const getUserInfo = async (credentials: UserCredentials) => {
  return await createApiRoot(credentials).me().get().execute();
};

export const logout = () => {
  const customerService = new CustomerService();
  customerService.logout();
};
