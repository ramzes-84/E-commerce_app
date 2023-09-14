'use client';

import { useState } from 'react';
import { addPromocode, deletePromocode } from '../utils/promocode-actions';
import SuccessPopup from '@/app/account/components/popup/successPopup';
import { getActiveCart } from '../utils/getActiveCart';

export default function Promocode({ cartID, cartVersion }: { cartID: string; cartVersion: number }) {
  const [value, setValue] = useState('');
  const [isApplyPromo, setIsApplyPromo] = useState(false);
  const [chageMessage, setChageMessage] = useState('');
  const [errorChange, setErrorChange] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  async function addPromocodeToCart() {
    try {
      const result = await addPromocode(cartID, cartVersion, value);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        setErrorChange(true);
        setChageMessage(err.message);
        setTimeout(() => {
          setErrorChange(false);
        }, 3000);
      }
    }
  }
  async function deletePromocodeToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const updateCart = await getActiveCart();
      const promoID: string = updateCart.discountCodes.map((code) => code.discountCode.id).join('');
      await deletePromocode(updateCart.id, updateCart.version, promoID);
    } catch (err) {
      if (err instanceof Error) {
        setErrorChange(true);
        setChageMessage('Something went wrong...');
        setTimeout(() => {
          setErrorChange(false);
        }, 3000);
      }
    }
  }

  return (
    <>
      <SuccessPopup message={chageMessage} errorChange={errorChange} successChange={false} />
      <h2 className="text-end font-serif font-bold text-rose-500 uppercase py-3">Enter promocode</h2>
      <form className="flex justify-end gap-1 font-serif" action={addPromocodeToCart}>
        <button type="button" onClick={() => setValue('')}>
          &#10060;
        </button>{' '}
        <input
          className="text-center border border-emerald-900 focus:outline-none focus:border-emerald-900 rounded focus:shadow-sm focus:shadow-emerald-700"
          type="text"
          value={value}
          onChange={handleChange}
          required
        />{' '}
        <button className="flex bg-emerald-900 text-white rounded px-2 py-1" type="submit">
          Apply
        </button>{' '}
      </form>
    </>
  );
}
