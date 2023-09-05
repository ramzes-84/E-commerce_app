import { ProductCard } from '@/service/api/CatalogService';
import { ProductProjection } from '@commercetools/platform-sdk';

export function cardsInfo(prods: ProductProjection[], discounted: ProductProjection[]) {
  return prods.map((p) => {
    const product: ProductCard = {
      name: p.name['en-US'],
      mainImage: p.masterVariant.images ? p.masterVariant.images[0].url : undefined,
      price: p.masterVariant.prices ? p.masterVariant.prices[0].value.centAmount : undefined,
      discountedPrice: discounted.find((d) => d.id === p.id)?.masterVariant.price?.discounted?.value.centAmount,
      description: p.description ? p.description['en-US'] : undefined,
      ID: p.id,
    };
    return product;
  });
}
