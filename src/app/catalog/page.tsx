import CatalogService from '@/service/api/CatalogService';
import CatalogCard from './catalogCard';
import { cardsInfo } from './cards';
import Link from 'next/link';

export default async function Page() {
  const catalogService = new CatalogService();
  const prods = await catalogService.getAllProducts();
  const productsArr = cardsInfo(prods);
  return (
    <>
      <div className="flex w-full ml-40 mb-3">
        <Link
          className=" hover:cursor-pointer hover:underline hover:underline-offset-2 text-lg font-bold text-emerald-900"
          href="/catalog"
        >
          All products
        </Link>
      </div>
      <div className="min-[1100px]:columns-3 gap-6 mx-4 min-[820px]:columns-2 min-[1320px]:columns-4 columns-1 ">
        {productsArr.map((p) => (
          <CatalogCard key={p.name} product={p} />
        ))}
      </div>
    </>
  );
}
