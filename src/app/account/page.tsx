import { CustomerInfo } from './CustomerInfo';
import { LogoutButton } from './LogoutButton';
import { getUserInfo, userIsLogged } from './account-actions';
import { redirect } from 'next/navigation';

export default async function Page() {
  const isLogged = userIsLogged();
  if (!isLogged) redirect('/login/');
  const customer = await getUserInfo();

  return (
    <>
      <h2 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">Your Account</h2>
      {isLogged && customer && <CustomerInfo customer={customer} />}
      {isLogged && <LogoutButton />}
    </>
  );
}
