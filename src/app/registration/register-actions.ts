'use server';

import { CustomerService } from '@/service/api';
import { IFormData } from './page';
import { UserCredentials } from '@/service/api/CustomerService';

export const register = async (formData: IFormData) => {
  const customerService = new CustomerService();
  await customerService.register(formData);
};

export const autoLogin = async (formData: IFormData) => {
  const credentials: UserCredentials = {
    username: formData.email,
    password: formData.password,
  };
  const customerService = new CustomerService();
  await customerService.login(credentials);
};
