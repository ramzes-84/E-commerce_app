import LoginForm from './LoginForm';
import { redirect } from 'next/navigation';
import { SessionDataStorage } from '@/controller/session/server';
import { RegisterPageButton } from './RegisterPageButton';

export default function Page() {
  const { customerId } = new SessionDataStorage().getData();

  if (customerId) redirect('/');

  return (
    <>
      <LoginForm />
      <RegisterPageButton />
    </>
  );
}
