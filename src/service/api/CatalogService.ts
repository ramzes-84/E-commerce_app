import { ApiService } from '@/service/api/ApiService';

export type ProductCard = {
  name: string;
  mainImage?: string;
  price?: number;
};
export default class CatalogService extends ApiService {
  public async getCategoriesArr() {
    const categories = await this.apiRoot.categories().get().execute();
    return categories.body.results;
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
}
