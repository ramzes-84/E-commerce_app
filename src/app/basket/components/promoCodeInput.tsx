'use client';

import { useState } from 'react';
import { addPromocode } from '../utils/promocode-actions';
import { Cart, DiscountCodeInfo } from '@commercetools/platform-sdk';

export default function Promocode({ cartID, cartVersion }: { cartID: string; cartVersion: number }) {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  async function addPromocodeToCart() {
    await addPromocode(cartID, cartVersion, value);
  }

  return (
    <>
      <form action={addPromocodeToCart}>
        <label htmlFor="">
          Promocode
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <button type="submit">Apply</button>
      </form>
    </>
  );
}
