'use client';

import { useState } from 'react';
import { addToCart, removeFromCart } from '../utils/addToCart';

export default function AddToCartBtn({ inCart, itemId }: { inCart: number; itemId: string }) {
  const [productQty, setProductQty] = useState(inCart);
  const addProduct = () => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await addToCart(itemId);
      setProductQty(productQty + 1);
    };
  };
  const removeProduct = () => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await removeFromCart(itemId);
      setProductQty(productQty - 1);
    };
  };
  return (
    <>
      {productQty === 0 ? (
        <form onSubmit={addProduct()}>
          <button className=" flex bg-emerald-900 text-white rounded px-2 py-1">Add to cart</button>
        </form>
      ) : (
        <div className="flex justify-between w-20 bg-emerald-900 text-white rounded px-2 py-1">
          <form onSubmit={removeProduct()}>
            <button className="  border-r pr-2 border-white " id="minus" name="minus">
              -
            </button>
          </form>
          <span>{productQty}</span>
          <form onSubmit={addProduct()}>
            <button className=" border-l pl-2 border-white" id="plus" name="plus">
              +
            </button>
          </form>
        </div>
      )}
    </>
  );
}
