import { ApiService } from '@/service/api/ApiService';

export type ProductCard = {
  name: string;
  mainImage?: string;
  price?: number;
  description?: string;
  ID: string;
};

export type Filters = {
  color?: string;
  catID?: string;
  priceFrom?: number;
  priceTo?: number;
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

  public async getProductsByFilters(filter: Filters) {
    const products = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [
            filter.color ? `variants.attributes.glass-color:"${filter.color}"` : '',
            filter.priceFrom && filter.priceTo
              ? `variants.price.centAmount:range (${filter.priceFrom * 100} to ${filter.priceTo * 100})`
              : '',
            filter.catID ? `categories.id: subtree("${filter.catID}")` : '',
          ].filter((x) => x !== ''),
          limit: 100,
        },
      })
      .execute();
    return products.body.results;
  }

  public async getAllProducts() {
    const products = await this.apiRoot
      .productProjections().search()
      .get({
        queryArgs: {
          limit: 100,
          sort: 'price desc'
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
