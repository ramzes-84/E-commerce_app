'use client';

import { useRouter } from 'next/navigation';
import { logout } from './account-actions';
import style from '../registration/page.module.css';

export function LogoutButton() {
  const router = useRouter();
  function handleLogout() {
    logout();
    router.refresh();
    router.push('/login');
  }

  return (
    <form action={handleLogout}>
      <button className={style.sentFormBtn} type="submit">
        Logout
      </button>
    </form>
  );
}
