'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SortForm() {
  const [sortVisible, setSortVisible] = useState(false);
  const [sort, setSort] = useState('');
  const router = useRouter();
  const path = usePathname();
  const query = useSearchParams();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sortPath = `sortby=${sort}`;
    const queryPath = query.toString().split('sortby')[0];
    setSortVisible(false);
    router.push(`${path}?${queryPath}${queryPath ? '&' : ''}${sortPath}`);
  }
  return (
    <>
      <div className="flex flex-col items-center justify-start w-36">
        <button
          className="w-fit px-5 border-spacing-2 border-2 border-emerald-900 rounded font-bold"
          onClick={() => setSortVisible(!sortVisible)}
        >
          Sort
        </button>
        {sortVisible && (
          <div>
            <form name="sort" className="flex flex-col" onSubmit={handleSubmit}>
              <label htmlFor="nameASC">
                <input
                  type="radio"
                  name="sortby"
                  value="nameASC"
                  onChange={(e) => setSort(e.target.value)}
                  id="nameASC"
                />
                Name (A-Z)
              </label>
              <label htmlFor="nameDESC">
                <input
                  type="radio"
                  name="sortby"
                  value="nameDESC"
                  onChange={(e) => setSort(e.target.value)}
                  id="nameDESC"
                />
                Name (Z-A)
              </label>
              <label htmlFor="priceASC">
                <input
                  type="radio"
                  name="sortby"
                  value="priceASC"
                  onChange={(e) => setSort(e.target.value)}
                  id="priceASC"
                />
                Price (min-max)
              </label>
              <label htmlFor="priceDESC">
                <input
                  type="radio"
                  name="sortby"
                  value="priceDESC"
                  onChange={(e) => setSort(e.target.value)}
                  id="priceDESC"
                />
                Price (max-min)
              </label>
              <div className="flex justify-between">
                {query.has('sortby') && (
                  <Link
                    href={`${path}?${query.toString().split('sortby')[0]}`}
                    className="w-fit mt-1 flex  px-2 rounded bg-emerald-900 text-white leading-6 "
                  >
                    Reset
                  </Link>
                )}
                <button
                  type="submit"
                  disabled={sort === ''}
                  className="w-fit mt-1 flex disabled:bg-slate-400  px-2 rounded bg-emerald-900 text-white leading-6"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
