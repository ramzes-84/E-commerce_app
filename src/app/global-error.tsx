'use client'
import Image from 'next/image'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center w-full font-serif h-96">
        <Image src="/logo-green.svg" width={90} height={90} alt="Logo" className="inline-block" />
        <h2 className=" text-2xl my-3">Something went wrong!</h2>
        <button
          className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-xl"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
