import { ButtonRemoveFromCart } from '@/app/product/[key]/components/ButtonRemoveFromCart';
import { LineItem } from '@commercetools/platform-sdk';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartBtn from '@/app/catalog/components/addToCartBtn';

export function DrawListItems({ lineItems }: { lineItems: LineItem[] }) {
  const liArr = lineItems.map((item) => {
    const link = item.productKey ? `/product/${item.productKey}` : `/product/id/${item.productId}`;
    let imgLink = item.variant.images ? item.variant.images[0].url : '/no-image.png';

    return (
      <li key={item.id} className="flex flex-row items-center gap-1 md:gap-2 py-3 border-b-4" id={item.productId}>
        <Image alt={item.name['en-US']} src={imgLink} width={50} height={150} className="rounded-[20%]" />
        <Link href={link} className="grow  hover:underline">
          <div className="md:text-lg text-base font-bold">{item.name['en-US']}</div>
        </Link>
        <div className="flex flex-col md:text-lg text-base">
          <div className="flex gap-2 items-center flex-col sm:flex-row sm:items-end">
            <div>
              {(item.price?.discounted?.value.centAmount
                ? item.price?.discounted?.value.centAmount
                : item.price?.value.centAmount) / 100}{' '}
              USD x
            </div>
            <div className="flex gap-2">
              <AddToCartBtn inCart={item.quantity} itemId={item.productId} />
              <ButtonRemoveFromCart lineItemId={item.id} qty={item.quantity} />
            </div>
          </div>
          <div className=" flex justify-end mt-1 font-bold">
            Overall:{' '}
            {((item.price?.discounted?.value.centAmount
              ? item.price?.discounted?.value.centAmount
              : item.price?.value.centAmount) /
              100) *
              item.quantity}{' '}
            USD

          </div>
        </div>
      </li>
    );
  });
  return <ul className="list-disc list-outside md:mx-10 mx-6">{liArr}</ul>;
}
