import CatalogService, { Filters, SortParams } from '@/service/api/CatalogService';
import CatalogCard from './components/catalogCard';
import { cardsInfo } from './utils/cards';
import CatalogNavPanel from './components/navPanel';
import FiltersApplied from './components/filtersApplied';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const catalogService = new CatalogService();
  const filters: Filters = {
    color: searchParams.color,
    priceFrom: searchParams.priceFrom ? Number(searchParams.priceFrom) : undefined,
    priceTo: searchParams.priceTo ? Number(searchParams.priceTo) : undefined,
  };
  const sort = searchParams.sortby ? SortParams[searchParams.sortby as keyof typeof SortParams] : '';
  const products = await catalogService.getProductsByFilters(filters, sort);
  const discountedProd = await catalogService.getDiscoutedProducts();
  const productsArr = cardsInfo(products, discountedProd);
  return (
    <>
      <CatalogNavPanel products={products} />
      <FiltersApplied />
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-start mx-3">
        {products.length !== 0 ? (
          productsArr.map((p) => <CatalogCard key={p.name} product={p} />)
        ) : (
          <p className=" text-xl text-emerald-900">No matching results</p>
        )}
      </div>
    </>
  );
}
