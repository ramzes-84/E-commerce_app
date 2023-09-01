import { Category, ProductProjection } from '@commercetools/platform-sdk';
import Breadcrumbs from './breadcrumbs';
import FiltersForm from './filters';

export default function CatalogNavPanel({
  category,
  products,
}: {
  category?: Category;
  products: ProductProjection[];
}) {
  return (
    <>
      <div className="flex w-full ml-40 mb-3 justify-between mr-28">
        <Breadcrumbs cat={category} />
        <FiltersForm prods={products} />
      </div>
    </>
  );
}
