'use client';
import { Filters } from '@/service/api/CatalogService';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FiltersApplied({ searchParams }: { searchParams: Filters }) {
  const path = usePathname();

  return (
    <div className="w-full flex justify-end mb-2">
      {searchParams.color && (
        <Link href={path} className=" hover:cursor-pointer underline underline-offset-2 mx-2">
          Color: {searchParams.color} ×
        </Link>
      )}
      {searchParams.priceFrom && (
        <Link href={path} className=" hover:cursor-pointer underline underline-offset-2 mx-2">
          Price range: {String(searchParams.priceFrom)}-{String(searchParams.priceTo)}USD ×{' '}
        </Link>
      )}
    </div>
  );
}
