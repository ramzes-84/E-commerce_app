import CartService from '@/service/api/CartService';
import { DrawListItems } from './components/DrawListItems';
import { EmptyCart } from './components/emptyCart';
import ClearCart from './components/clearCart';
import Promocode from './components/promoCodeInput';

export default async function Page() {
  const cartService = new CartService();
  const activeCard = await cartService.getActiveCart();
  const activeCardID = activeCard.id;
  const cartProducts = activeCard.lineItems;
  return (
    <>
      <section className="mx-3 font-serif text-emerald-900">
        <h2 className="text-center uppercase text-2xl  my-5 font-bold text-emerald-900">Cart</h2>
        {cartProducts.length !== 0 ? (
          <>
            <ClearCart cartId={activeCardID} cartVersion={activeCard.version} activeCart={activeCard} />
            <DrawListItems lineItems={cartProducts} />
            <div className="flex flex-col items-end py-3 text-2xl font-bold">
              <div className="text-emerald-900">Total price: {activeCard.totalPrice.centAmount / 100} USD</div>
            </div>
            <Promocode cartID={activeCardID} cartVersion={activeCard.version} />
          </>
        ) : (
          <EmptyCart />
        )}
      </section>
    </>
  );
}
