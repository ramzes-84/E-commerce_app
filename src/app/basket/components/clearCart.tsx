'use client';

import clearHandler from '../utils/clearCart';

export default function ClearCart({ cartId, cartVersion }: { cartId: string; cartVersion: number }) {
  return (
    <button
      className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-xl"
      onClick={() => clearHandler(cartId, cartVersion)}
    >
      Clear cart
    </button>
  );
}
