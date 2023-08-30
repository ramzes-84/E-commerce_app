'use server';

import CustomerService from '@/service/api/CustomerService';

export const getUserInfo = async () => {
  const customerService = new CustomerService();
  const customer = await customerService.getCurrentCustomer();
  return customer;
};

export const logout = () => {
  const customerService = new CustomerService();
  customerService.logout();
};
