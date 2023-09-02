import { ProductProjection } from '@commercetools/platform-sdk';

export default function minMaxPrice(prods: ProductProjection[]) {
  const prices = prods
    .map((p) => (p.masterVariant.prices ? p.masterVariant.prices.map((pr) => pr.value.centAmount / 100) : 0))
    .flat();
  return [Math.min(...prices), Math.max(...prices)];
}
