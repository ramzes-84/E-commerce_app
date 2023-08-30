import { ApiService } from '@/service/api/ApiService';

export default class CatalogService extends ApiService {
  public async getCategoriesArr() {
    const categories = await this.apiRoot.categories().get().execute();
    return categories.body.results;
  }
}
