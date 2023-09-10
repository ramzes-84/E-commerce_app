import Image from 'next/image';

export default function Loader() {
  return (
    <>
      <Image src="/Spinner-1s-200px.gif" width={90} height={90} alt="loading" className="inline-block" />
    </>
  );
}
