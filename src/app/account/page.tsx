import { CustomerInfo } from './CustomerInfo';
import { LogoutButton } from './LogoutButton';

export default function Page() {

  return (
    <>
      <h2 className="text-center uppercase mb-3">Account section</h2>
      <CustomerInfo />
      <LogoutButton />
    </>
  );
}
