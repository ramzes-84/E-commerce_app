import Link from 'next/link';

export default function Home() {
  return (
    <main className="py-10 font-serif">
      <p className="my-6 mx-8">Hello, Main page!</p>
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
