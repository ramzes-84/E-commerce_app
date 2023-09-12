import { ButtonRemoveFromCart } from '@/app/product/[key]/components/ButtonRemoveFromCart';
import { LineItem } from '@commercetools/platform-sdk';
import Link from 'next/link';
import Image from 'next/image';

export function DrawListItems({ lineItems }: { lineItems: LineItem[] }) {
  let cartCost = 0;
  const liArr = lineItems.map((item) => {
    const lineCost = (item.price.value.centAmount / 100) * item.quantity;
    cartCost += lineCost;
    const link = item.productKey ? `/product/${item.productKey}` : `/product/id/${item.productId}`;
    let imgLink = item.variant.images
      ? item.variant.images[0].url
      : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

    return (
      <li key={item.id} className="flex flex-row items-center gap-2 py-3">
        <Image alt={item.name['en-US']} src={imgLink} width={50} height={150} className="rounded-[20%]" />
        <Link href={link} className="grow dark:text-blue-600 hover:underline">
          <div>{item.name['en-US']}</div>
        </Link>
        <div>{item.quantity} pcs.</div>
        <div> *</div>
        <div>{item.price.value.centAmount / 100} USD</div>
        <div> =</div>
        <div>{lineCost} USD</div>
        <ButtonRemoveFromCart lineItemId={item.id} />
      </li>
    );
  });
  return (
    <ul className="list-disc list-outside mx-3 divide-y-4 font-serif text-emerald-600">
      {liArr}
      <li className="flex flex-row justify-end items-center gap-2 py-3">
        <div>Total price: {cartCost} USD</div>
      </li>
    </ul>
  );
}
