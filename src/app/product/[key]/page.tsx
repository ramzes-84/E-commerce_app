import { DrawAttributes } from './components/DrawAttributes';
import { ProductNavBar } from './components/ProductNavBar';
import Slider from './components/Slider';
import { getProductByKey } from './components/product-functions';

export default async function Page({ params }: { params: { key: string } }) {
  const res = await getProductByKey(params.key);
  const product = res?.product;
  const discount = res?.discount;
  if (!product) return <div>Getting product fails</div>;

  const productName = product.name['en-US'];
  const productDesc = product.description ? product.description['en-US'] : 'Not created';
  const masterVarImgs = product.masterVariant.images
    ? product.masterVariant.images.map((item) => item.url)
    : ['https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'];
  const masterVarAttrs = product.masterVariant.attributes;
  const masterVarSKU = product.masterVariant.sku || 'Not created';
  const masterVarPrices = product.masterVariant.prices
    ? product.masterVariant.prices[0].value.centAmount / 100
    : 'Priceless';
  const discountPrice = discount ? discount / 100 : undefined;

  return (
    <>
      <h2 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">{productName}</h2>
      <section className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <Slider urlArr={masterVarImgs} />
        <div>
          <p className=" font-bold text-emerald-800">Description:</p>
          <p>{productDesc}</p>
          {masterVarAttrs && <DrawAttributes attrArr={masterVarAttrs} />}
          <p>
            <span className=" font-bold text-emerald-800">SKU:</span> {masterVarSKU}
          </p>
          {discountPrice ? (
            <p>
              <span className=" font-bold text-emerald-800">Price: </span>
              <span className="font-bold text-red-800">{discountPrice}$ </span>
              <span className="font-bold text-emerald-900 line-through">{masterVarPrices}$</span>
            </p>
          ) : (
            <p>
              <span className=" font-bold text-emerald-800">Price:</span> {masterVarPrices}$
            </p>
          )}
          <button className="border border-solid border-transparent rounded  bg-emerald-900 text-white cursor-pointer py-1 px-3">
            Add to cart
          </button>
        </div>
      </section>
      <ProductNavBar />
    </>
  );
}
