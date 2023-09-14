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
        className="flex justify-center items-center border border-solid border-transparent rounded bg-emerald-900 text-white cursor-pointer sm:h-8 h-6 sm:w-8 w-6 "
      >
        <ImBin data-testid="delete" />
      </button>
    </form>
  );
}
