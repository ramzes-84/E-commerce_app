import CatalogService from '@/service/api/CatalogService';
import { Category } from '@commercetools/platform-sdk';

export default async function GetCategories() {
  const catalogService = new CatalogService();
  const categoriesArr = await catalogService.getCategoriesArr();
  const categoriesAsPlainText = categoriesArr.map((item: Category) => item.name['en-US']).join(', ');

  return <p>{categoriesAsPlainText}</p>;
}
