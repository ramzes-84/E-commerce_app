'use client';

import { ProductCard } from '@/service/api/CatalogService';
import CatalogCard from './catalogCard';
import { useEffect } from 'react';

export default function SearchHighlight({ res, list }: { res: string; list: ProductCard[] }) {
  useEffect(() => {
    const words = [res, res.charAt(0).toUpperCase() + res.slice(1)];
    const searchedPara = window.document.querySelectorAll('.highlightedSearch');
    const regex1 = RegExp(words[0], 'g');
    const replacement1 = `<span class='bg-yellow-200'>${words[0]}</span>`;
    const regex2 = RegExp(words[1], 'g');
    const replacement2 = `<span class='bg-yellow-200'>${words[1]}</span>`;
    searchedPara?.forEach((p) => {
      const newHTML = p.textContent?.replace(regex1, replacement1).replace(regex2, replacement2);
      p.innerHTML = newHTML ? newHTML : '';
    });
  }, [res]);

  return (
    <>
      {list.map((p) => (
        <CatalogCard key={p.name} product={p} />
      ))}
    </>
  );
}
