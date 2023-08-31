'use client';
import { ProductProjection } from '@commercetools/platform-sdk';
import AttributeList from '../utils/attributes';
import minMaxPrice from '../utils/priceRange';
import { useState } from 'react';

export default function Filters({ prods }: { prods: ProductProjection[] }) {
  const [minPrice, maxPrice] = minMaxPrice(prods);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [priceRangeMin, setPriceRangeMin] = useState(minPrice);
  const [priceRangeMax, setPriceRangeMax] = useState(maxPrice);
  return (
    <>
      <div className="flex flex-col items-end justify-start w-96">
        <button
          className="w-fit px-5 border-spacing-2 border-2 border-emerald-900 rounded font-bold"
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          Filters
        </button>
        {filtersVisible && (
          <form className="flex " action="/">
            <div className="flex flex-col my-2 mx-2">
              <p className="flex">
                <label htmlFor="minPrice" className=" w-24 flex font-bold text-emerald-900">
                  Price from:
                </label>
                <input
                  id="minPrice"
                  type="number"
                  className="w-10"
                  min={minPrice}
                  max={priceRangeMax - 1}
                  value={priceRangeMin}
                  onChange={(e) => setPriceRangeMin(Number(e.target.value))}
                ></input>
                <span className="leading-6 text-sm">USD</span>
              </p>
              <p className="flex mt-1">
                <label htmlFor="maxPrice" className="w-24 flex font-bold text-emerald-900">
                  Price to:
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  className="w-10"
                  min={priceRangeMin + 1}
                  max={maxPrice}
                  value={priceRangeMax}
                  onChange={(e) => setPriceRangeMax(Number(e.target.value))}
                ></input>
                <span className=" text-sm leading-6">USD</span>
              </p>
            </div>
            <div className=" w-20 my-2 mx-2">
              <select name="color" form="colorCheck">
                <option>Color</option>
                {AttributeList(prods).map((p) => {
                  return <option key={p}>{p}</option>;
                })}
              </select>
              <button className="mt-1 px-4 rounded bg-emerald-900 text-white leading-6">Apply</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
