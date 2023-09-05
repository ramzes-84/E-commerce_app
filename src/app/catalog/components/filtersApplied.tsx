'use client';
import { Filters } from '@/service/api/CatalogService';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import urlBuilder from '../utils/urlBuilder';

export default function FiltersApplied({ searchParams }: { searchParams: Filters }) {
  const path = usePathname();
  const colorPath = searchParams.color ? `color=${searchParams.color}` : '';
  const pricePath =
    searchParams.priceFrom && searchParams.priceTo
      ? `priceFrom=${String(searchParams.priceFrom)}&priceTo=${String(searchParams.priceTo)}`
      : '';
  const query = useSearchParams();
  const sortPath = query.has('sortby') ? `sortby=${query.get('sortby')}` : '';
  return (
    <div className="w-full flex justify-end mb-2 mr-6">
      {searchParams.color && (
        <Link
          href={urlBuilder({ basePath: path, pricePath: pricePath, sortPath: sortPath })}
          className=" hover:cursor-pointer underline underline-offset-2 mx-2"
        >
          Color: {searchParams.color} ×
        </Link>
      )}
      {searchParams.priceFrom && (
        <Link
          href={urlBuilder({ basePath: path, colorPath: colorPath, sortPath: sortPath })}
          className=" hover:cursor-pointer underline underline-offset-2 mx-2"
        >
          Price range: {String(searchParams.priceFrom)}-{String(searchParams.priceTo)}USD ×
        </Link>
      )}
      {query.has('sortby') && (
        <Link
          href={urlBuilder({ basePath: path, colorPath: colorPath, pricePath: pricePath })}
          className=" hover:cursor-pointer underline underline-offset-2 mx-2"
        >
          Sort: {query.get('sortby')} ×
        </Link>
      )}
    </div>
  );
}
