'use client';

import { ProductCard } from '@/service/api/CatalogService';
import CatalogCard from './catalogCard';
import { useEffect } from 'react';

export default function SearchHighlight({ res, list }: { res: string; list: ProductCard[] }) {
  useEffect(() => {
    const str = decodeURI(res.toLowerCase()).split(' ');
    const searchedPara = window.document.querySelectorAll('.highlightedSearch');
    const regex1 = RegExp(`\\b(${str.join('|')})\\b`, 'gi');
    searchedPara?.forEach((p) => {
      const newHTML = p.textContent?.split(regex1);
      p.innerHTML = newHTML
        ? newHTML.map((x) => `<span ${x.match(regex1) ? "class='bg-yellow-200'" : ''} >${x}</span>`).join('')
        : '';
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
