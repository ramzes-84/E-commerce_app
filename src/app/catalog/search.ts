import { Category } from '@commercetools/platform-sdk';

export type CategoryItem = {
  name: string;
  id: string;
  key?: string;
  parent?: string;
  children?: CategoryItem[];
  link?: string;
};

export function categoriesList(cats: Category[]) {
  const list = cats
    .map((c) => {
      const cat: CategoryItem = {
        name: c.name['en-US'],
        id: c.id,
        key: c.key,
        parent: c.parent?.obj?.key,
        children: cats
          .filter((ct) => ct.parent?.obj?.key === c.key)
          .map((x) => {
            const child: CategoryItem = { name: x.name['en-US'], key: x.key, id: x.id, parent: x.parent?.obj?.key };
            return child;
          }),
      };
      return cat;
    })
    .filter((x) => !x.parent);
  return list.map((x) => {
    if (x.children?.length === 0) delete x.children;
    return x;
  });
}
