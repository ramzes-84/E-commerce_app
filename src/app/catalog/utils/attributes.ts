import { ProductProjection } from '@commercetools/platform-sdk';

export default function AttributeList(prods: ProductProjection[]) {
  const a = prods.map(
    (p) => p.masterVariant.attributes?.filter((atr) => atr.name === 'glass-color').map((atr) => atr.value as string)
  );
  let seen: string[] = [];
  return a.flat().filter((item) => {
    if (item) return seen.includes(item) ? false : seen.push(item);
  });
}
