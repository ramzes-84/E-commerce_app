import Slider from './Slider';
import { DrawAttributes } from './DrawAttributes';
import { getProductById } from './product-functions';
import { ProductNavBar } from './ProductNavBar';

export default async function Page({ params }: { params: { ID: string } }) {
  const product = await getProductById(params.ID);

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
          <p>
            <span className=" font-bold text-emerald-800">Price:</span> {masterVarPrices}$
          </p>
          <button className="border border-solid border-transparent rounded  bg-emerald-900 text-white cursor-pointer py-1 px-3">
            Add to cart
          </button>
        </div>
      </section>
      <ProductNavBar />
    </>
  );
}
