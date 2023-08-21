'use client';

import { useRouter } from 'next/navigation';
import style from '../registration/page.module.css';

export function RegisterPageButton() {
  const router = useRouter();
  function handleRedirect() {
    router.push('/registration');
  }

  return (
    <form action={handleRedirect}>
      <button className={style.sentFormBtn} type="submit">
        Registration
      </button>
    </form>
  );
}
