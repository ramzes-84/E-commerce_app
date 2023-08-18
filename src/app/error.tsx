'use client';
import Image from 'next/image';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-end w-full font-serif h-96">
      <Image src="/logo-green.svg" width={90} height={90} alt="Logo" className="inline-block" />
      <h1 className=" text-2xl py-3">Something went wrong!</h1>
      <button
        className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-xl"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
