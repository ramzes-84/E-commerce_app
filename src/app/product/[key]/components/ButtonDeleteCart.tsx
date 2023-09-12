import CartService from '@/service/api/CartService';

export function ButtonDeleteCart({ cartID, cartVersion }: { cartID: string; cartVersion: number }) {
  async function handleDelete() {
    'use server';
    const cartService = new CartService();
    const res = await cartService.deleteCart(cartID, cartVersion);
  }

  return (
    <form action={handleDelete}>
      <button
        type="submit"
        className="border border-solid border-transparent rounded mt-3 bg-emerald-900 text-white cursor-pointer py-1 px-1"
      >
        &#10060; Delete cart
      </button>
    </form>
  );
}
