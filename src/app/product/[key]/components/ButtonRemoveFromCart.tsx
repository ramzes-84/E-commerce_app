import CartService from '@/service/api/CartService';

export function ButtonRemoveFromCart({ lineItemId }: { lineItemId: string }) {
  async function removeFromCart() {
    'use server';
    const cartService = new CartService();
    const res = await cartService.removeProductFromCart(lineItemId);
  }

  return (
    <form action={removeFromCart}>
      <button
        type="submit"
        className="border border-solid border-transparent rounded mt-3 bg-emerald-900 text-white cursor-pointer py-1 px-1"
      >
        &#10060; Remove
      </button>
    </form>
  );
}
