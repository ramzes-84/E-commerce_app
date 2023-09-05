import { Category } from '@commercetools/platform-sdk';
import Link from 'next/link';

export default function Breadcrumbs({ cat }: { cat?: Category }) {
  return (
    <div className="mb-4">
      <Link
        className=" hover:cursor-pointer hover:underline hover:underline-offset-2 text-lg font-bold text-emerald-900"
        href="/catalog"
      >
        All products
      </Link>
      <span className="text-lg font-bold text-emerald-900 px-2">/</span>
      {cat && cat.parent && (
        <>
          <Link
            className=" hover:cursor-pointer hover:underline hover:underline-offset-2 text-lg font-bold text-emerald-900"
            href={`/catalog/${cat.parent.obj?.key}`}
          >
            {cat.parent?.obj?.name['en-US']}
          </Link>
          <span className="text-lg font-bold text-emerald-900 px-2">/</span>
        </>
      )}
      {cat && (
        <Link
          className=" hover:cursor-pointer hover:underline hover:underline-offset-2 text-lg font-bold text-emerald-900"
          href={cat.slug}
        >
          {cat.name['en-US']}
        </Link>
      )}
    </div>
  );
}
