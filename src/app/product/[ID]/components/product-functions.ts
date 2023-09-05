import CatalogService from '@/service/api/CatalogService';
import { ProductProjection } from '@commercetools/platform-sdk';

export async function getProductById(id: string): Promise<ProductProjection> {
  const catalogService = new CatalogService();
  const product = await catalogService.getProductObjById(id);
  return product;
}
