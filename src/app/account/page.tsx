import { CustomerService } from '@/service/api';
import { CustomerInfo } from './CustomerInfo';
import { LogoutButton } from './LogoutButton';

export default function Page() {
  const customerServices = new CustomerService();
  const isLogged = customerServices.isLogged();

  return (
    <>
      <h2 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">Account section</h2>
      {isLogged && <CustomerInfo />}
      {isLogged && <LogoutButton />}
      {!isLogged && <p>You are not logged in.</p>}
    </>
  );
}
