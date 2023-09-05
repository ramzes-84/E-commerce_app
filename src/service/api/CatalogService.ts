import { ApiService } from '@/service/api/ApiService';

export type ProductCard = {
  name: string;
  mainImage?: string;
  price?: number;
  discountedPrice?: number;
  description?: string;
  ID: string;
  key: string | undefined;
};

export type Filters = {
  color?: string;
  catID?: string;
  priceFrom?: number;
  priceTo?: number;
};

export enum SortParams {
  nameASC = 'name.en-us asc',
  nameDESC = 'name.en-us desc',
  priceASC = 'price asc',
  priceDESC = 'price desc',
}
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

  public async getProductsByFilters(filter: Filters, sort: string) {
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
          sort: [sort],
        },
      })
      .execute();
    return products.body.results;
  }

  public async getProductsBySearch(filter: Filters, sort: string, search?: string) {
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
          ].filter((x) => x !== ''),
          limit: 100,
          sort: [sort],
          'text.en-US': search,
        },
      })
      .execute();
    return products.body.results;
  }

  public async getDiscoutProduct(key: string) {
    const product = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          priceCurrency: 'USD',
          filter: ['variants.scopedPriceDiscounted:true', `variants.sku:"${key}"`],
        },
      })
      .execute();
    return product.body.results;
  }

  public async getDiscoutedProducts() {
    const products = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          priceCurrency: 'USD',
          filter: 'variants.scopedPriceDiscounted:true',
        },
      })
      .execute();
    return products.body.results;
  }

  public async getProductObjByKey(productKey: string) {
    const product = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `key:"${productKey}"`,
        },
      })
      .execute();
    return product.body.results;
  }

  public async getProductObjById(productID: string) {
    const responseProduct = await this.apiRoot.productProjections().withId({ ID: productID }).get().execute();
    return responseProduct.body;
  }
}
