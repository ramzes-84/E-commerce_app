import { ButtonRemoveFromCart } from '@/app/product/[key]/components/ButtonRemoveFromCart';
import { LineItem } from '@commercetools/platform-sdk';

export function DrawListItems({ lineItems }: { lineItems: LineItem[] }) {
  const liArr = lineItems.map((item) => {
    return (
      <li key={item.id} className="flex flex-row gap-2 items-baseline">
        <div className="grow">{item.name['en-US']}</div>
        <div>{item.quantity} pcs.</div>
        <div>{item.price.value.centAmount / 100} USD</div>
        <ButtonRemoveFromCart lineItemId={item.id} />
      </li>
    );
  });
  return <ol className="list-disc list-inside mx-3">{liArr}</ol>;
}
