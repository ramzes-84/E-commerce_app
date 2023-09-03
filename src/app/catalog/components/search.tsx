'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchForm() {
  const router = useRouter();
  const [searchstring, setSearchstring] = useState('');
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/catalog/search/${searchstring.trim()}`);
    setSearchstring('');
  }
  return (
    <>
      <form name="search" onSubmit={handleSubmit} className="flex flex-col w-full mt-6">
        <input
          className="flex my-3 w-32 md:w-40 border-spacing-2 border-2 border-gray-500 rounded text-black"
          type="text"
          name="searchfield"
          id="searchfield"
          value={searchstring}
          onChange={(e) => setSearchstring(e.target.value)}
        />
        <button type="submit" className="w-fit px-5 border-spacing-2 border-2 border-white rounded">
          Search
        </button>
      </form>
    </>
  );
}
