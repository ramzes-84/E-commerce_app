import CatalogService from '@/service/api/CatalogService';
import { LocalizedString } from '@commercetools/platform-sdk';

export default async function Page({ params }: { params: { ID: string } }) {
  const catalogService = new CatalogService();
  const product = await catalogService.getProductObjById(params.ID);
  return (
    <>
      <h1>Product Page for {product.id}</h1>
    </>
  );
}
