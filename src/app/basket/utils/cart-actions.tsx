import CartService from '@/service/api/CartService';

export const getActiveCart = async () => {
  const cartService = new CartService();
  const activeCart = await cartService.getActiveCart();
  return activeCart;
};
