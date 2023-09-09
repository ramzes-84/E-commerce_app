'use client';

import addToCartFunc from '../utils/addToCart';

export function ButtonCart({ productID }: { productID: string }) {
  const addToCart = (productID: string) => async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addToCartFunc(productID);
  };

  return (
    <form onSubmit={addToCart(productID)}>
      <button
        type="submit"
        className="border border-solid border-transparent rounded mt-3 bg-emerald-900 text-white cursor-pointer py-1 px-1"
      >
        &#128722; Add to cart
      </button>
    </form>
  );
}
