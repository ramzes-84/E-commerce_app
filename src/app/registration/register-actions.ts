'use server';

import { CustomerService } from '@/service/api';
import { IFormData } from './page';

export const register = async (formData: IFormData) => {
  const customerService = new CustomerService();

  await customerService.register(formData);
};
