'use server';

import { Category } from '@commercetools/platform-sdk';
import { createApiRoot } from '@/service/api/client';

export const getCategories = async () => {
  const response = await createApiRoot().categories().get().execute();
  return response.body.results.map((item: Category) => item.name['en-US']);
};
