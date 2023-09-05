export default function urlBuilder({
  basePath,
  colorPath,
  pricePath,
  sortPath,
}: {
  basePath: string;
  colorPath?: string;
  pricePath?: string;
  sortPath?: string;
}) {
  return `${basePath}${colorPath || pricePath || sortPath ? '?' : ''}${colorPath ? colorPath : ''}${
    (pricePath || sortPath) && colorPath ? '&' : ''
  }${pricePath ? pricePath : ''}${sortPath && pricePath ? '&' : ''}${sortPath ? sortPath : ''}`;
}
