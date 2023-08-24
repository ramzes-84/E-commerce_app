import CatalogService from '@/service/api/CatalogService';
import { Category } from '@commercetools/platform-sdk';
import CatalogCard from './catalogCard';
import { cardsInfo } from './cards-actions';

export default async function Catalog() {
  const catalogService = new CatalogService();
  const categoriesArr = await catalogService.getCategoriesArr();
  const categoriesAsPlainText = categoriesArr.map((item: Category) => (
    <li key={item.name['en-US']}>{item.name['en-US']}</li>
  ));

  const productsArr = await cardsInfo();

  return (
    <div className="flex font-serif ">
      <section>
        <h1 className="text-2xl font-bold text-emerald-900 text-center  uppercase my-6">Catalog Page</h1>
        <div className="lg:columns-3 gap-8 mx-20 md:columns-2 xl:columns-4 columns-1">
          {productsArr.map((p) => (
            <CatalogCard key={p.name} product={p} />
          ))}
        </div>
      </section>
      <aside className=" w-1/4 bg-emerald-900 text-white pl-6 ">
        <div className="fixed">
          <h3 className=" text-xl">Categories:</h3>
          {categoriesAsPlainText}
        </div>
      </aside>
    </div>
  );
}
