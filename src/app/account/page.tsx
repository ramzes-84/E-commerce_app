import { redirect } from 'next/navigation';
import { CustomerInfo } from './components/customerInfo/CustomerInfo';
import { LogoutButton } from './components/loggoutButton/LogoutButton';
import { getUserInfo, userIsLogged } from './account-actions';
import CartService from '@/service/api/CartService';

export default async function Page() {
  const isLogged = userIsLogged();
  if (!isLogged) redirect('/login/');
  const customer = await getUserInfo();
  const cartService = new CartService();
  const res = await cartService.getAllCarts();
  const cartsArr = res.results;

  return (
    <>
      <h2 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">Your Account</h2>
      {isLogged && customer && <CustomerInfo customer={customer} />}
      <p>You have {res.results.length} carts:</p>
      {cartsArr.map((cart) => (
        <p key={cart.id}>
          Cart with ID {cart.id} has {cart.lineItems.length} items
        </p>
      ))}
      {isLogged && <LogoutButton />}
    </>
  );
}
