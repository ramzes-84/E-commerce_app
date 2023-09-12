import CartService from '@/service/api/CartService';
import { DrawListItems } from './components/DrawListItems';
import { EmptyCart } from './components/emptyCart';

export default async function Page() {
  const cartService = new CartService();
  const res = await cartService.getActiveCart();
  const cartProducts = res.lineItems;

  return (
    <>
      <h2 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">Cart</h2>
      {cartProducts.length !== 0 ? <DrawListItems lineItems={cartProducts} /> : <EmptyCart />}
    </>
  );
}
