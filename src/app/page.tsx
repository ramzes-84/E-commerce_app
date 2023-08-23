import { SessionDataStorage } from '@/controller/session/server';
import { CustomerService } from '@/service/api';
import { CustomerCard } from '@/app/CustomerCard';
import Link from 'next/link';

export default async function Home() {
  const customerService = new CustomerService();
  const { customerId } = new SessionDataStorage().getData();

  let customer;
  if (customerId) {
    customer = await customerService.getCurrentCustomer();
  }

  return <main className='py-10 font-serif'>
    {customer ? <CustomerCard customer={customer} /> : <p className='my-6 mx-8'>Hello, Main page!</p>}
    <Link
        href="/login"
        className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-lg mx-4 my-6"
      >
        Lon in
    </Link>
    <Link
       href="/registration"
        className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-lg mx-4 my-6"
      >
        Registration
      </Link>
  </main>;
}
