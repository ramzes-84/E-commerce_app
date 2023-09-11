'use client';

import { useState } from 'react';
import { addToCart, removeFromCart } from '../utils/addToCart';
import Loader from './loader';

export default function AddToCartBtn({ inCart, itemId }: { inCart: number; itemId: string }) {
  const [productQty, setProductQty] = useState(inCart);
  const [isLoading, setIsLoading] = useState(false);
  const addProduct = () => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      await addToCart(itemId);
      setProductQty(productQty + 1);
      setIsLoading(false);
    };
  };
  const removeProduct = () => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      await removeFromCart(itemId);
      setProductQty(productQty - 1);
      setIsLoading(false);
    };
  };
  return (
    <>
      {productQty === 0 ? (
        <form onSubmit={addProduct()}>
          <button className=" flex bg-emerald-900 text-white rounded px-2 py-1">Add to cart</button>
        </form>
      ) : (
        <div className="flex justify-between w-20 bg-emerald-900 text-white rounded py-1">
          <form onSubmit={removeProduct()}>
            <button className="  border-r px-2 border-white " id="minus" name="minus">
              -
            </button>
          </form>
          {isLoading ? <Loader size={22} /> : <span className=" w-3 text-center">{productQty}</span>}
          <form onSubmit={addProduct()}>
            <button className=" border-l px-2 border-white" id="plus" name="plus">
              +
            </button>
          </form>
        </div>
      )}
    </>
  );
}
