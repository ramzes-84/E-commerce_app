import CartService from '@/service/api/CartService';
import { ImBin } from 'react-icons/im';

export function ButtonRemoveFromCart({ lineItemId, qty }: { lineItemId: string; qty: number }) {
  async function removeFromCart() {
    'use server';
    const cartService = new CartService();
    const res = await cartService.removeProductFromCart(lineItemId, qty);
  }

  return (
    <form action={removeFromCart}>
      <button
        type="submit"
        className="border border-solid border-transparent rounded bg-emerald-900 text-white cursor-pointer p-2"
      >
        <ImBin data-testid="delete" />
      </button>
    </form>
  );
}
