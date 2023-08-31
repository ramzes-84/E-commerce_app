import { Category } from '@commercetools/platform-sdk';

export type CategoryItem = {
  name: string;
  id: string;
  key?: string;
  parent?: string;
  children?: CategoryItem[];
  link?: string;
  slug: string;
};

function catToCatItem(c: Category): CategoryItem {
  return {
    name: c.name['en-US'],
    id: c.id,
    key: c.key,
    slug: c.slug['en-US'],
    parent: c.parent?.obj?.key,
  };
}

export function categoriesList(cats: Category[]) {
  const list = cats
    .map((c) => {
      const cat = catToCatItem(c);
      cat.children = cats.filter((ct) => ct.parent?.obj?.key === c.key).map((x) => catToCatItem(x));
      return cat;
    })
    .filter((x) => !x.parent);
  return list.map((x) => {
    if (x.children?.length === 0) delete x.children;
    return x;
  });
}
