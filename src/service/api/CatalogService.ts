import { ApiService } from '@/service/api/ApiService';

export type ProductCard = {
  name: string;
  mainImage?: string;
  price?: number;
  description?: string;
  ID: string;
};
export default class CatalogService extends ApiService {
  public async getCategoriesArr() {
    const categories = await this.apiRoot
      .categories()
      .get({
        queryArgs: {
          expand: ['parent'],
        },
      })
      .execute();
    return categories.body.results;
  }

  public async getProductsByCategory(id: string) {
    const products = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `categories.id: subtree("${id}")`,
        },
      })
      .execute();
    return products.body.results;
  }

  public async getAllProducts() {
    const products = await this.apiRoot
      .productProjections()
      .get({
        queryArgs: {
          limit: 100,
        },
      })
      .execute();
    return products.body.results;
  }

  public async getProductObjById(productID: string) {
    const responseProduct = await this.apiRoot.productProjections().withId({ ID: productID }).get().execute();
    return responseProduct.body;
  }
}
