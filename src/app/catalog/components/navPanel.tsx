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
      <div className="flex w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6 mb-3 justify-between md:mx-10 mx-28 flex-col md:flex-row">
        <Breadcrumbs cat={category} />
        <FiltersForm prods={products} />
      </div>
    </>
  );
}
