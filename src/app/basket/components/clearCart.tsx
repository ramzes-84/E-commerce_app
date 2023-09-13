'use client';

import { createPortal } from 'react-dom';
import { useState } from 'react';
import CartPopup from './popup';
import { deletePromocode } from '../utils/promocode-actions';
import { Cart, DiscountCodeInfo } from '@commercetools/platform-sdk';

export default function ClearCart({
  cartId,
  cartVersion,
  activeCart,
}: {
  cartId: string;
  cartVersion: number;
  activeCart: Cart;
}) {
  const [popupOpen, setPopupOpen] = useState(false);
  const removePromocode = () => {
    return async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const promo: DiscountCodeInfo[] = activeCart.discountCodes;
      const promoID: string = promo.map((code) => code.discountCode.id).join('');
      await deletePromocode(cartId, cartVersion, promoID);
    };
  };
  return (
    <>
      <button
        className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-xl my-3"
        onClick={() => {
          setPopupOpen(true);
          removePromocode();
        }}
      >
        Clear cart
      </button>
      {popupOpen &&
        createPortal(
          <CartPopup cartId={cartId} cartVersion={cartVersion} exit={() => setPopupOpen(false)} />,
          document.body
        )}
    </>
  );
}
