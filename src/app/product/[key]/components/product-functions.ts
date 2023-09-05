import CatalogService from '@/service/api/CatalogService';
import { ProductProjection } from '@commercetools/platform-sdk';

export async function getProductById(id: string): Promise<ProductProjection> {
  const catalogService = new CatalogService();
  const product = await catalogService.getProductObjById(id);
  return product;
}

export async function getProductByKey(key: string) {
  const catalogService = new CatalogService();
  const product = await catalogService.getProductObjByKey(key);
  const discount = await catalogService.getDiscoutProduct(key);
  if (product.length === 1) {
    return { product: product[0], discount: discount[0] };
  } else if (product.length === 0) throw new Error('There is no variants with such parameters');
  else if (product.length > 1) throw new Error('There are more than one variant with such parameters');
}
