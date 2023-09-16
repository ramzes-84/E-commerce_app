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
      <li key={item.id} className="flex flex-row items-center gap-2 py-3">
        <Image alt={item.name['en-US']} src={imgLink} width={50} height={150} className="rounded-[20%]" />
        <Link href={link} className="grow dark:text-blue-600 hover:underline">
          <div>{item.name['en-US']}</div>
        </Link>
        <AddToCartBtn inCart={item.quantity} itemId={item.productId} />
        <div> *</div>
        <div>{item.price.value.centAmount / 100} USD</div>
        <div> =</div>
        <div>{item.totalPrice.centAmount / 100} USD</div>
        <ButtonRemoveFromCart lineItemId={item.id} qty={item.quantity} />
      </li>
    );
  });
  return <ul className="list-disc list-outside divide-y-4">{liArr}</ul>;
}
