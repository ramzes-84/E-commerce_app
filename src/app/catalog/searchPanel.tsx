import { Category } from '@commercetools/platform-sdk';

export default function SearchPanel({ categoriesList }: { categoriesList: Category[] }) {
  const categoriesAsPlainText = categoriesList.map((item: Category) => (
    <li key={item.name['en-US']}>{item.name['en-US']}</li>
  ));
  return (
    <aside className=" w-60 md:w-52 bg-emerald-900 text-white pl-6 fixed right-0 h-full -mt-20 pt-28 z-0">
      <div className="fixed">
        <h3 className=" text-xl">Categories:</h3>
        {categoriesAsPlainText}
      </div>
    </aside>
  );
}
