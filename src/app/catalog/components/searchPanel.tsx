import Link from 'next/link';
import { CategoryItem } from '../utils/categories';
import CategoryLink from './categoryLink';
import SearchForm from './search';

export default function SearchPanel({ categoriesList }: { categoriesList: CategoryItem[] }) {
  const cats = categoriesList.map((item) => {
    return <CategoryLink item={item} key={item.name} />;
  });
  return (
    <aside className=" w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 bg-emerald-900 text-white pl-6 fixed right-0 h-screen -mt-[61px] pt-20 z-0">
      <div className="fixed w-full">
        <h3 className=" text-lg uppercase block">Categories:</h3>
        <Link href="/catalog" className="hover:opacity-75 my-1 hover:-translate-y-0.5 leading-6">
          All Products
        </Link>
        <ul>{cats}</ul>
        <SearchForm />
      </div>
    </aside>
  );
}
