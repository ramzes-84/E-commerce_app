import Link from 'next/link';
import { CategoryItem } from '../utils/categories';

export default function CategoryLink({ item }: { item: CategoryItem }) {
  const link = `/catalog/${item.slug}`;
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
