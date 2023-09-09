import CartService from '@/service/api/CartService';

export default async function Page() {
  const cartService = new CartService();
  const res = await cartService.getActiveCart();
  const cartProducts = res.lineItems.map((item) => item.name['en-US']).join(', ');

  return (
    <>
      <h3>Your basket</h3>
      <p>Your active cart ID: {res.id ? res.id : 'not found.'}</p>
      <p>Your active cart: {cartProducts ? cartProducts : 'not found.'}</p>
    </>
  );
}
