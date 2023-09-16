import Link from 'next/link';

export default function Home() {
  return (
    <main className="py-10 font-serif mx-10">
      <h1 className="my-6 mx-8 text-3xl text-emerald-900 text-center">Welcome to Ostara Glass Shop!</h1>
      <p className=" text-xl text-emerald-900">
        Here you can find home decor items, made by hand in stained glass technique
      </p>
      <p className=" text-lg text-emerald-900">
        <span className="font-bold">Categories on sale:</span>{' '}
        <Link href="/catalog/mirrors" className="underline hover:cursor-pointer underline-offset-2">
          Mirrors
        </Link>
        ,{' '}
        <Link href="/catalog/flower-moons" className=" hover:cursor-pointer underline underline-offset-2">
          Flower moons
        </Link>
      </p>
      <p className="mb-5 text-lg text-emerald-900">
        <span className=" font-bold">Search suggestions:</span> you may search by plant name (e.g. &quot;
        <Link href="/catalog/search/fern" className="underline hover:cursor-pointer underline-offset-2">
          fern
        </Link>
        &quot; or &quot;
        <Link href="/catalog/search/heather" className="underline hover:cursor-pointer underline-offset-2">
          heather
        </Link>
        &quot;), by shape (e.g. &quot;
        <Link href="/catalog/search/sun" className="underline hover:cursor-pointer underline-offset-2">
          sun
        </Link>
        &quot;, &quot;
        <Link href="/catalog/search/whale" className="underline hover:cursor-pointer underline-offset-2">
          whale
        </Link>
        &quot;, &quot;
        <Link href="/catalog/search/leaves" className="underline hover:cursor-pointer underline-offset-2">
          leaves
        </Link>
        &quot;) or color
      </p>
      <Link
        href="/login"
        className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-lg mx-4 my-6"
      >
        Log in
      </Link>
      <Link
        href="/registration"
        className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-lg mx-4 my-6"
      >
        Registration
      </Link>
    </main>
  );
}
