import { deletePromocode } from '@/app/basket/utils/promocode-actions';
import CartService from '@/service/api/CartService';
import { DiscountCodeInfo } from '@commercetools/platform-sdk';

export function ButtonRemoveFromCart({ lineItemId, qty }: { lineItemId: string; qty: number }) {
  async function removeFromCart() {
    'use server';
    const cartService = new CartService();
    const activeCart = await cartService.removeProductFromCart(lineItemId, qty);
    const qtyProducts = activeCart.lineItems.length;
    const promocodesInfo: DiscountCodeInfo[] = activeCart.discountCodes;
    if (qtyProducts === 0) {
      for (const promoInfo of promocodesInfo) {
        const cartService = new CartService();
        const newActiveCart = await cartService.getActiveCart();
        await deletePromocode(newActiveCart.id, newActiveCart.version, promoInfo.discountCode.id);
      }
    }
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
