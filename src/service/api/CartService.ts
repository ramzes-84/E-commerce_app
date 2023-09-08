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
    const response = await this.apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
          lineItems: [{ productId: productId }],
        },
      })
      .execute();
    return response.body;
  }
}
