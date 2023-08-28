import CatalogService from '@/service/api/CatalogService';
import CatalogCard from '../catalogCard';
import { cardsInfo } from '../cards';

export default async function Page({ params }: { params: { slug: string } }) {
  const catalogService = new CatalogService();
  const cat = await catalogService.getCategoryByKey(params.slug);
  const products = await catalogService.getProductsByCategory(cat.id);
  const list = cardsInfo(products);
  return (
    <>
      <div className="min-[1100px]:columns-3 gap-6 mx-4 min-[820px]:columns-2 min-[1320px]:columns-4 columns-1 ">
        {list.map((p) => (
          <CatalogCard key={p.name} product={p} />
        ))}
      </div>
    </>
  );
}
