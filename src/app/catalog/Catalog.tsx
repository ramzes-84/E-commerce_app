import CatalogService from '@/service/api/CatalogService';
import CatalogCard from './catalogCard';
import { cardsInfo } from './cards-actions';
import SearchPanel from './searchPanel';

export default async function Catalog() {
  const catalogService = new CatalogService();
  const categoriesArr = await catalogService.getCategoriesArr();
  const productsArr = await cardsInfo();

  return (
    <div className="flex font-serif">
      <section className='flex flex-col items-center w-4/5 xl:w-5/6'>
        <h1 className="text-2xl font-bold text-emerald-900 text-center  uppercase my-6">Catalog Page</h1>
        <div className="min-[1100px]:columns-3 gap-6 mx-4 min-[820px]:columns-2 min-[1320px]:columns-4 columns-1 ">
          {productsArr.map((p) => (
            <CatalogCard key={p.name} product={p} />
          ))}
        </div>
      </section>
      <SearchPanel categoriesList={categoriesArr} />
    </div>
  );
}
