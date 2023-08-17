import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-end w-full font-serif h-96">
      <Image src="/logo-green.svg" width={90} height={90} alt="Logo" className="inline-block" />
      <h1 className=" text-3xl">404 Not Found</h1>
      <p className="text-xl my-5">Could not find requested resource</p>
      <Link
        href="/"
        className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-xl"
      >
        Return Home
      </Link>
    </div>
  )
}
