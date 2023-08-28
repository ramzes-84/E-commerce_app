import CatalogService from '@/service/api/CatalogService';
import { LocalizedString } from '@commercetools/platform-sdk';

export default async function Page({ params }: { params: { ID: string } }) {
  const catalogService = new CatalogService();
  const product = await catalogService.getProductObjById(params.ID);
  return (
    <>
      <h1>Product Page</h1>
      <div>Name: {product.name['en-US']}</div>
      <div>Description: {product.description ? product.description['en-US'] : null}</div>
      <div>Slug: {product.slug ? product.slug['en-US'] : null}</div>
      <div>Main variant SKU: {product.masterVariant.sku}</div>
    </>
  );
}
