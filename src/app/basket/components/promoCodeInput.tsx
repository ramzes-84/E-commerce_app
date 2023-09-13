'use client';

import { useState } from 'react';
import { addPromocode } from '../utils/promocode';
import { Cart, DiscountCodeInfo } from '@commercetools/platform-sdk';

export default function Promocode({ cartID, cartVersion }: { cartID: string; cartVersion: number }) {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const addPromocodeToCart = () => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const cartWithPromocode: Cart = await addPromocode(cartID, cartVersion, value);
      const promo: DiscountCodeInfo[] = cartWithPromocode.discountCodes;
      const promoID: string = promo.map((code) => code.discountCode.id).join('');
    };
  };

  return (
    <>
      <form onSubmit={addPromocodeToCart()}>
        <label htmlFor="">
          Promocode
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <button type="submit">Apply</button>
      </form>
    </>
  );
}
