import Link from 'next/link';
import { CategoryItem } from './search';

export default function SearchPanel({ categoriesList }: { categoriesList: CategoryItem[] }) {
  const cats = categoriesList.map((item) => {
    return <CategoryLink item={item} key={item.name} />;
  });
  return (
    <aside className=" w-60 md:w-52 bg-emerald-900 text-white pl-6 fixed right-0 h-screen -mt-[61px] pt-20 z-0">
      <div className="fixed">
        <h3 className=" text-lg uppercase ">Categories:</h3>
        <Link href="/catalog" className="hover:opacity-75 my-1 hover:-translate-y-0.5">
          All
        </Link>
        <ul>{cats}</ul>
      </div>
    </aside>
  );
}

export function CategoryLink({ item }: { item: CategoryItem }) {
  const link = `/catalog/category/${item.id}`;
  return item.children ? (
    <>
      <Link href={link} className="hover:opacity-75 my-1 hover:-translate-y-0.5">
        {item.name}
      </Link>
      <ul>
        {item.children.map((x) => (
          <CategoryLink item={x} key={x.name} />
        ))}
      </ul>
    </>
  ) : (
    <li className={item.parent ? 'ml-3' : ''} key={item.name}>
      <Link href={link} className="hover:opacity-75 my-1 hover:-translate-y-0.5">
        {item.name}
      </Link>
    </li>
  );
}
