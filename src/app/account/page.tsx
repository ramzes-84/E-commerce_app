import { CustomerInfo } from './CustomerInfo';
import { LogoutButton } from './LogoutButton';
import { getUserInfo, userIsLogged } from './account-actions';

export default async function Page() {
  // const [customer, setCustomer] = useState<IMyCustomer>();
  const isLogged = userIsLogged();
  const customer = await getUserInfo();

  // useEffect(() => {
  //   async function getDataCustomer() {
  //     try {
  //       const result = await getUserInfo();
  //       setCustomer(result);
  //     } catch(error) {
  //       console.error(error);
  //     }
  //   }
  //   getDataCustomer();
  // }, [customer]);

  return (
    <>
      <h2 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">Your Account</h2>
      {isLogged && customer && <CustomerInfo customer={customer} />}
      {isLogged && <LogoutButton />}
    </>
  );
}
