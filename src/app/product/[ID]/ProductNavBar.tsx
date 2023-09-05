'use client';

import { useRouter } from 'next/navigation';

export function ProductNavBar() {
  const router = useRouter();

  return (
    <section className="flex flex-col md:flex-row gap-4 justify-center items-center my-4">
      <button
        className="border border-solid border-transparent rounded  bg-emerald-900 text-white cursor-pointer py-1 px-3"
        onClick={() => {
          router.back();
        }}
      >
        Previous page
      </button>
    </section>
  );
}
