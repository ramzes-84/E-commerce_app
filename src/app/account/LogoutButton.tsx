import { useRouter } from 'next/navigation';
import { logout } from './account-actions';

export function LogoutButton() {
  const router = useRouter();
  function handleLogout() {
    logout();
    router.push('/login');
  }

  return <button onClick={handleLogout}>Logout</button>;
}
