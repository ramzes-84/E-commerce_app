import { Attribute } from '@commercetools/platform-sdk';

export function DrawAttributes({ attrArr }: { attrArr: Attribute[] }) {
  const listItems = attrArr.map((attrObj) => (
    <li key={attrObj.name}>
      <span className="">{attrObj.name}</span>: {attrObj.value}
    </li>
  ));

  return (
    <ul>
      <span className=" font-bold text-emerald-800">Attributes:</span>
      {listItems}
    </ul>
  );
}
