import { ApiService } from '@/service/api/ApiService';

export default class CartService extends ApiService {
  public async getActiveCart() {
    const response = await this.apiRoot.me().activeCart().get().execute();
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
  }
}
