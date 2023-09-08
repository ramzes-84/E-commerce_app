import CatalogService, { Filters, SortParams } from '@/service/api/CatalogService';
import CatalogCard from './components/catalogCard';
import { cardsInfo } from './utils/cards';
import CatalogNavPanel from './components/navPanel';
import FiltersApplied from './components/filtersApplied';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Pagination from './components/pagination';

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
  const pageProducts = await catalogService.getProductsByFilters(filters, sort, 12, 0);
  const productsArr = cardsInfo(pageProducts, discountedProd);
  return (
    <>
      <CatalogNavPanel products={products} />
      <FiltersApplied />
      <Pagination filters={filters} sort={sort} productsArr={productsArr} />
    </>
  );
}
