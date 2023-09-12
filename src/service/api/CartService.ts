import { SessionDataStorage } from '@/controller/session/server';
import { ApiService } from '@/service/api/ApiService';
import { Cart } from '@commercetools/platform-sdk';

export default class CartService extends ApiService {
  public async getActiveCart() {
    const response = await this.apiRoot.me().activeCart().get().execute();
    this.updateCartProdsQty(response.body);
    return response.body;
  }

  public async getAllCarts() {
    const response = await this.apiRoot.me().carts().get().execute();
    return response.body;
  }

  public async addProductToCart(productId: string) {
    const activeCart = await this.apiRoot.me().activeCart().get().execute();
    const activeCartID: string = activeCart.body.id;
    const activeCartVersion = activeCart.body.version;
    const req = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: activeCartID })
      .post({
        body: {
          version: activeCartVersion,
          actions: [
            {
              action: 'addLineItem',
              productId,
              quantity: 1,
            },
          ],
        },
      })
      .execute();
    this.updateCartProdsQty(req.body);
  }

  public async removeProductFromCart(lineItemId: string, qty: number) {
    const activeCart = await this.apiRoot.me().activeCart().get().execute();
    const activeCartID: string = activeCart.body.id;
    const activeCartVersion = activeCart.body.version;
    const req = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: activeCartID })
      .post({
        body: {
          version: activeCartVersion,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId,
              quantity: qty,
            },
          ],
        },
      })
      .execute();
    this.updateCartProdsQty(req.body);
  }

  public cartProdsQty() {
    const session = new SessionDataStorage().getData();
    return session.qty;
  }

  public updateCartProdsQty(cart: Cart) {
    const storage = new SessionDataStorage();
    const session = storage.getData();
    session.qty = cart.totalLineItemQuantity;
    storage.save(session);
  }

  public async createCart() {
    const currentCart = this.getActiveCart();
    if (!currentCart) {
      const cartDraft = {
        currency: 'USD',
      };
      const result = await this.apiRoot.me().carts().post({ body: cartDraft }).execute();
      return result.body;
    }
  }
}
