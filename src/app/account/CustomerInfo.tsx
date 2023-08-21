import { CustomerService } from '@/service/api';

export async function CustomerInfo() {
  const customerService = new CustomerService();
  const customer = await customerService.getCurrentCustomer();

  return (
    <>
      <p>Name: {customer.firstName}</p>
      <p>Lastname: {customer.lastName}</p>
      <p>Email: {customer.email}</p>
      <p>Birthday: {customer.dateOfBirth}</p>
    </>
  );
}
