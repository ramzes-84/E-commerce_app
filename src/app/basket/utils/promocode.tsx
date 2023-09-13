'use server';

import CartService from '@/service/api/CartService';

export async function addPromocode(cartID: string, cartVersion: number, promocode: string) {
  const cart = new CartService();
  const result = await cart.addPromocode(cartID, cartVersion, promocode);
  return result;
}

export async function deletePromocode(cartID: string, cartVersion: number, promocodeID: string) {
  const cart = new CartService();
  const result = await cart.deletePromocode(cartID, cartVersion, promocodeID);
  return result;
}
