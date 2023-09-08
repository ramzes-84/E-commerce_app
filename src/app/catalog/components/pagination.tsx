'use client';

import { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Filters, ProductCard, SortParams } from '@/service/api/CatalogService';
import getPageProducts from '../utils/pageProducts';
import CatalogCard from './catalogCard';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Pagination({
  filters,
  sort,
  productsArr,
}: {
  filters: Filters;
  sort: SortParams | '';
  productsArr: ProductCard[];
}) {
  const query = useSearchParams();
  useEffect(() => {
    setPage(0);
    const updatePage = async () => {
      const newPageProducts = await getPageProducts({ page: 0, filters, sort });
      setPageProducts(newPageProducts);
    };
    updatePage();
  }, [query]);
  const [page, setPage] = useState(0);
  const [pageProducts, setPageProducts] = useState(productsArr);
  const handleSubmit = (page: number) => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newPageProducts = await getPageProducts({ page, filters, sort });
      setPageProducts(newPageProducts);
    };
  };
  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-start mx-3">
        {pageProducts.length !== 0 ? (
          pageProducts.map((p) => <CatalogCard key={p.name} product={p} />)
        ) : (
          <p className=" text-xl text-emerald-900">No matching results</p>
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit(page)}>
          <button type="submit" onClick={() => setPage(page + 1)} className=" bg-emerald-900 rounded">
            <AiOutlineRight />
          </button>
        </form>
        <span>{page}</span>
      </div>
    </>
  );
}
