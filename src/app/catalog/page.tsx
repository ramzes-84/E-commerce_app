import CatalogService from '@/service/api/CatalogService';
import CatalogCard from './components/catalogCard';
import { cardsInfo } from './utils/cards';
import CatalogNavPanel from './components/navPanel';

export default async function Page() {
  const catalogService = new CatalogService();
  const prods = await catalogService.getAllProducts();
  const productsArr = cardsInfo(prods);
  return (
    <>
      <CatalogNavPanel products={prods} />
      <div className="min-[1100px]:columns-3 gap-6 mx-4 min-[820px]:columns-2 min-[1320px]:columns-4 columns-1 ">
        {productsArr.map((p) => (
          <CatalogCard key={p.name} product={p} />
        ))}
      </div>
    </>
  );
}
