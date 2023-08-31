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

  public async getCategoryByKey(key: string) {
    const categories = await this.apiRoot
      .categories()
      .withKey({ key })
      .get({
        queryArgs: {
          expand: ['parent'],
        },
      })
      .execute();
    return categories.body;
  }

  public async getProductsByFilters(filter:{ color?: string, catID?: string, prices?: [number, number]}) {
    const products = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [filter.color ? `variants.attributes.glass-color:"${filter.color}"` : '',
          filter.prices ? `variants.price.centAmount:range (${filter.prices[0] * 100} to ${filter.prices[1] * 100})` : '',
           filter.catID ? `categories.id: subtree("${filter.catID}")`: ''
          ].filter(x => x!=='')
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
