'use client';
import { Filters } from '@/service/api/CatalogService';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import urlBuilder from '../utils/urlBuilder';

export default function FiltersApplied() {
  const path = usePathname();
  const query = useSearchParams();
  return (
    <div className="w-full flex justify-end mb-2 mr-6">
      {query.has('color') && (
        <Link
          href={urlBuilder({
            basePath: path,
            priceFrom: query.get('priceFrom'),
            priceTo: query.get('priceTo'),
            sort: query.get('sortby'),
          })}
          className=" hover:cursor-pointer underline underline-offset-2 mx-2"
        >
          Color: {query.get('color')} ×
        </Link>
      )}
      {query.has('priceFrom') && (
        <Link
          href={urlBuilder({ basePath: path, color: query.get('color'), sort: query.get('sortby') })}
          className=" hover:cursor-pointer underline underline-offset-2 mx-2"
        >
          Price range: {query.get('priceFrom')}-{query.get('priceTo')}USD ×
        </Link>
      )}
      {query.has('sortby') && (
        <Link
          href={urlBuilder({
            basePath: path,
            color: query.get('color'),
            priceFrom: query.get('priceFrom'),
            priceTo: query.get('priceTo'),
          })}
          className=" hover:cursor-pointer underline underline-offset-2 mx-2"
        >
          Sort: {query.get('sortby')} ×
        </Link>
      )}
    </div>
  );
}
