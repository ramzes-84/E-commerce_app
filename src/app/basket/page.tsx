import CartService from '@/service/api/CartService';
import { DrawListItems } from './components/DrawListItems';

export default async function Page() {
  const cartService = new CartService();
  const res = await cartService.getActiveCart();
  const activeCardID = res.id;
  const cartProducts = res.lineItems;

  return (
    <>
      <h2 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">Cart</h2>
      <DrawListItems lineItems={cartProducts} />
    </>
  );
}
