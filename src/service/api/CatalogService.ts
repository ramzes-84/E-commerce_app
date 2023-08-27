import { ApiService } from '@/service/api/ApiService';

export default class CatalogService extends ApiService {
  public async getCategoriesArr() {
    const categories = await this.apiRoot.categories().get().execute();
    return categories.body.results;
  }

  public async getProductObjById(productID: string) {
    const responseProduct = await this.apiRoot
      .productProjections()
      .withId({ ID: productID })
      // .get({queryArgs: {productKey}})
      // .withKey({key: productKey})
      .get()
      .execute();
    return responseProduct.body;
  }
}
