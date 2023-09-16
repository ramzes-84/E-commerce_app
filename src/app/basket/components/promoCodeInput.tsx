'use client';

import { useEffect, useState } from 'react';
import { addPromocode, deletePromocode } from '../utils/promocode-actions';
import SuccessPopup from '@/app/account/components/popup/successPopup';
import { getActiveCart } from '../utils/getActiveCart';
import { DiscountCodeInfo } from '@commercetools/platform-sdk';

export default function Promocode({
  cartID,
  cartVersion,
  price,
  discountPrice,
}: {
  cartID: string;
  cartVersion: number;
  price: number;
  discountPrice: number;
}) {
  const [value, setValue] = useState('');
  const [isApplyPromo, setIsApplyPromo] = useState(false);
  const [successChange, setSuccessChange] = useState(false);
  const [chageMessage, setChageMessage] = useState('');
  const [errorChange, setErrorChange] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function updatePrice() {
      const activeCart = await getActiveCart();
      const result = activeCart?.totalPrice.centAmount / 100;
      setTotalPrice(result);
    }

    updatePrice();
  }, [isApplyPromo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  async function addPromocodeToCart() {
    try {
      const result = await addPromocode(cartID, cartVersion, value);
      setIsApplyPromo(true);
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

  async function deletePromocodeFromCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const activeCart = await getActiveCart();
      const promocodesInfo: DiscountCodeInfo[] = activeCart.discountCodes;
      for (const promoInfo of promocodesInfo) {
        const newActiveCart = await getActiveCart();
        await deletePromocode(newActiveCart.id, newActiveCart.version, promoInfo.discountCode.id);
      }
      setSuccessChange(true);
      setChageMessage('Promocodes have been successfully removed');
      setTimeout(() => {
        setSuccessChange(false);
      }, 3000);
      setIsApplyPromo(false);
      setValue('');
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
      <SuccessPopup message={chageMessage} errorChange={errorChange} successChange={successChange} />
      <div className="flex justify-end items-center gap-1 py-4">
        <h2 className="text-end font-serif font-bold text-rose-500 uppercase">Enter promocode</h2>
      </div>
      <form className="flex flex-col items-end gap-1 font-serif" action={addPromocodeToCart}>
        <div className="">
          <label className="relative" htmlFor="">
            <button className="absolute right-0" type="button" onClick={() => setValue('')}>
              &#10060;
            </button>{' '}
            <input
              className="text-start px-2 border border-emerald-900 focus:outline-none focus:border-emerald-900 rounded focus:shadow-sm focus:shadow-emerald-700"
              type="text"
              value={value}
              onChange={handleChange}
              required
            />{' '}
          </label>
        </div>
        <div className="flex gap-1">
          <button className="flex bg-emerald-900 text-white rounded px-2 py-1" type="submit">
            Apply
          </button>{' '}
          <button className="flex bg-emerald-900 text-white rounded px-2 py-1" onClick={deletePromocodeFromCart}>
            Remove Promocodes
          </button>
        </div>
      </form>
      <div className="flex flex-col items-end py-3 sm:text-2xl min-[320px]:text-xl font-bold">
        <div className="text-emerald-900">Total price: {price?.toFixed(2)} USD</div>
      </div>
      {price > discountPrice && (
        <>
          <div className="flex flex-col items-end text-end py-3 text-2xl md:text-3xl sm:text-2xl font-bold">
            <div className="text-rose-700">New total price with promocode: {discountPrice.toFixed(2)} USD</div>
          </div>
        </>
      )}
    </>
  );
}
