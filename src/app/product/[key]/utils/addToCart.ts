'use server';
import CartService from '@/service/api/CartService';

export default async function addToCartFunc(id: string) {
  const cartService = new CartService();
  await cartService.addProductToCart(id);
}
