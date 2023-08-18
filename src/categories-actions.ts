'use server';

import { apiRoot } from './service/api/client';
import { Category } from '@commercetools/platform-sdk';

export const getCategories = async () => {
  const response = await apiRoot.categories().get().execute();
  const categories = response.body.results.map((item: Category) => item.name['en-US']);
  return categories;
};
