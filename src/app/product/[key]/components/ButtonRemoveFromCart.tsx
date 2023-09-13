import { deletePromocode } from '@/app/basket/utils/promocode';
import CartService from '@/service/api/CartService';
import { DiscountCodeInfo } from '@commercetools/platform-sdk';

export function ButtonRemoveFromCart({ lineItemId, qty }: { lineItemId: string; qty: number }) {
  async function removeFromCart() {
    'use server';
    const cartService = new CartService();
    const activeCart = await cartService.removeProductFromCart(lineItemId, qty);
    const qtyProducts = activeCart.lineItems.length;
    const promo: DiscountCodeInfo[] = activeCart.discountCodes;
    const promoID: string = promo.map((code) => code.discountCode.id).join('');
    qtyProducts === 0 ? await deletePromocode(activeCart.id, activeCart.version, promoID) : null;
  }

  return (
    <form action={removeFromCart}>
      <button
        type="submit"
        className="border border-solid border-transparent rounded bg-emerald-900 text-white cursor-pointer py-1 px-1"
      >
        &#10060; Remove
      </button>
    </form>
  );
}
