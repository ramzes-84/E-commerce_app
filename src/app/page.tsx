import { SessionDataStorage } from '@/controller/session/server';
import { CustomerService } from '@/service/api';
import { CustomerCard } from '@/app/CustomerCard';

export default async function Home() {
  const customerService = new CustomerService();
  const { customerId } = new SessionDataStorage().getData();

  let customer;
  if (customerId) {
    customer = await customerService.getCurrentCustomer();
  }

  return <main>{customer ? <CustomerCard customer={customer} /> : <p>Hello, Main page!</p>}</main>;
}
