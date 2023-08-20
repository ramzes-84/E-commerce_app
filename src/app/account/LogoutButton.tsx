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
    <button className={style.sentFormBtn} onClick={handleLogout}>
      Logout
    </button>
  );
}
