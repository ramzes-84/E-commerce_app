export default function urlBuilder({
  basePath,
  color,
  priceFrom,
  priceTo,
  sort,
}: {
  basePath: string;
  color?: string | null;
  priceFrom?: string | null;
  priceTo?: string | null;
  sort?: string | null;
}) {
  const colorPath = color ? `color=${color}` : '';
  const pricePath = priceFrom && priceTo ? `priceFrom=${priceFrom}&priceTo=${priceTo}` : '';
  const sortPath = sort ? `sortby=${sort}` : '';
  return `${basePath}${colorPath || pricePath || sortPath ? '?' : ''}${color ? colorPath : ''}${
    (pricePath || sortPath) && colorPath ? '&' : ''
  }${priceFrom ? pricePath : ''}${sortPath && pricePath ? '&' : ''}${sort ? sortPath : ''}`;
}
