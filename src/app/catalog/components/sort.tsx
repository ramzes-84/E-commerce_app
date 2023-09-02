'use client';
export enum SortParams {
  nameASC = 'name.en-us asc',
  nameDESC = 'name.en-us desc',
  priceASC = 'price asc',
  priceDESC = 'price desc',
}

import { useState } from 'react';

export default function SortForm() {
  const [sortVisible, setSortVisible] = useState(false);
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
            <form name="sort" className="flex flex-col">
              <label htmlFor="nameASC">
                <input type="radio" name="sortby" value='nameASC' id="nameASC" />
                Name (A-Z)
              </label>
              <label htmlFor="nameDESC">
                <input type="radio" name="sortby" value='nameDESC' id="nameDESC" />
                Name (Z-A)
              </label>
              <label htmlFor="priceASC">
                <input type="radio" name="sortby" value='priceASC' id="priceASC" />
                Price (min-max)
              </label>
              <label htmlFor="priceDESC">
                <input type="radio" name="sortby" value='priceDESC' id="priceDESC" />
                Price (max-min)
              </label>
              <button  type="submit" className="mt-1 px-4 rounded bg-emerald-900 text-white leading-6 w-fit">Apply</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
