import CartService from '@/service/api/CartService';

export function ButtonAddToCart({ productID }: { productID: string }) {
  async function addToCart() {
    'use server';
    const cartService = new CartService();
    const res = await cartService.addProductToCart(productID);
  }

  return (
    <form action={addToCart}>
      <button
        type="submit"
        className="border border-solid border-transparent rounded mt-3 bg-emerald-900 text-white cursor-pointer py-1 px-1"
      >
        &#128722; Add to cart
      </button>
    </form>
  );
}
