'use client';

import { useState } from 'react';
import { Filters, ProductCard, SortParams } from '@/service/api/CatalogService';
import getPageProducts from '../utils/pageProducts';
import CatalogCard from './catalogCard';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PaginationBtn from './paginationBtn';

export default function Pagination({
  filters,
  sort,
  productsArr,
  maxProds,
}: {
  filters: Filters;
  sort: SortParams | '';
  productsArr: ProductCard[];
  maxProds: number;
}) {
  const maxPage = Math.ceil(maxProds / 12) - 1;
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
  useEffect(() => {
    const btn1 = window.document.getElementById('>') as HTMLButtonElement;
    btn1.disabled = page === maxPage;
    const btn2 = window.document.getElementById('>>') as HTMLButtonElement;
    btn2.disabled = page === maxPage;
    const btn3 = window.document.getElementById('<') as HTMLButtonElement;
    btn3.disabled = page === 0;
    const btn4 = window.document.getElementById('<<') as HTMLButtonElement;
    btn4.disabled = page === 0;
  }, [pageProducts]);
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
      <div className="flex mb-6">
        <PaginationBtn
          submitFunc={handleSubmit(page)}
          clickFunc={() => {
            if (page > 0) setPage(0);
          }}
          img="<<"
        />
        <PaginationBtn
          submitFunc={handleSubmit(page)}
          clickFunc={() => {
            if (page > 0) setPage(page - 1);
          }}
          img="<"
        />
        <span className="flex items-center justify-center text-emerald-900 border-spacing-2 border-2 mx-2 text-xl border-emerald-900 rounded-3xl font-bold w-10 h-10 py-1">
          {page + 1}
        </span>
        <PaginationBtn
          submitFunc={handleSubmit(page)}
          clickFunc={() => {
            if (page < maxPage) setPage(page + 1);
          }}
          img=">"
        />
        <PaginationBtn
          submitFunc={handleSubmit(page)}
          clickFunc={() => {
            if (page < maxPage) setPage(maxPage);
          }}
          img=">>"
        />
      </div>
    </>
  );
}
