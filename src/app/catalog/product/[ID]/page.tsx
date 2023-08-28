import CatalogService from '@/service/api/CatalogService';
import Image from 'next/image';

export default async function Page({ params }: { params: { ID: string } }) {
  const catalogService = new CatalogService();
  const product = await catalogService.getProductObjById(params.ID);
  const productName = product.name['en-US'];
  const productDesc = product.description ? product.description['en-US'] : 'Not created';
  const productMetaDesc = product.metaDescription ? product.metaDescription['en-US'] : 'Not created';
  const productMetaTitle = product.metaTitle ? product.metaTitle['en-US'] : 'Not created';
  const productMetaKeywords = product.metaKeywords ? product.metaKeywords['en-US'] : 'Not created';
  const productID = product.id;
  const productKey = product.key || 'Not created';
  const productSlug = product.slug['en-US'];
  const variantsCount = product.variants.length;
  const productCategories = product.categories.map((cat) => cat.obj?.name['en-US']).join(', ');
  const masterVarID = product.masterVariant.id;
  const masterVarImgs = product.masterVariant.images
    ? product.masterVariant.images.map((item) => item.url).join(', ')
    : 'Not created';
  const masterVarAttrs =
    product.masterVariant.attributes?.map((item) => `${item.name} : ${item.value}`).join(', ') || 'Not created';
  const masterVarKey = product.masterVariant.key || 'Not created';
  const masterVarSKU = product.masterVariant.sku || 'Not created';
  const masterVarPrices = product.masterVariant.prices
    ? product.masterVariant.prices[0].value.centAmount / 100
    : 'Not created';

  return (
    <>
      <h1>{productName}</h1>
      <section className="flex">
        <Image
          src={product.masterVariant.images ? product.masterVariant.images[0].url : '/assets/noImage.png'}
          alt={productMetaDesc}
          width={300}
          height={300}
        />
        <div>
          <p>Description: {productDesc}</p>
          <p>Meta Description: {productMetaDesc}</p>
          <p>Meta Title: {productMetaTitle}</p>
          <p>Meta Keywords: {productMetaKeywords}</p>
          <p>ID: {productID}</p>
          <p>Key: {productKey}</p>
          <p>Slug: {productSlug}</p>
          <p>Variants: {variantsCount}</p>
          <p>In categories: {productCategories}</p>
          <p>Master Variant ID: {masterVarID}</p>
          <p>Master Variant Image Links: {masterVarImgs}</p>
          <p>Master Variant Attributes: {masterVarAttrs}</p>
          <p>Master Variant Key: {masterVarKey}</p>
          <p>Master Variant SKU: {masterVarSKU}</p>
          <p>Master Variant Price: {masterVarPrices}</p>
        </div>
      </section>
    </>
  );
}
