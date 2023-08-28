import { PropsWithChildren } from 'react';
import SearchPanel from './searchPanel';
import CatalogService from '@/service/api/CatalogService';
import { categoriesList } from './search';

export default async function Layout({ children }: PropsWithChildren) {
  const catalogService = new CatalogService();
  const categoriesArr = await catalogService.getCategoriesArr();
  const catList = categoriesList(categoriesArr);
  return (
    <div className="flex font-serif">
      <section className="flex flex-col items-center w-4/5 xl:w-5/6">
        <h1 className="text-2xl font-bold text-emerald-900 text-center  uppercase my-6">Catalog Page</h1>
        {children}
      </section>
      <SearchPanel categoriesList={catList} />
    </div>
  );
}
