import { CustomerService } from '@/service/api';

export async function CustomerInfo() {
  const customerService = new CustomerService();
  const customer = await customerService.getCurrentCustomer().catch((err) => console.log(err));

  return customer ? (
    <div className=" font-serif flex w-full flex-col items-center my-6">
      <div>
        <p className=" text-lg py-1">
          <span className=" font-bold text-emerald-800">Name:</span> {customer.firstName}
        </p>
        <p className=" text-lg py-1">
          <span className=" font-bold text-emerald-800">Lastname:</span> {customer.lastName}
        </p>
        <p className=" text-lg py-1">
          <span className=" font-bold text-emerald-800">Email:</span> {customer.email}
        </p>
        <p className=" text-lg py-1">
          <span className=" font-bold text-emerald-800">Birthday:</span> {customer.dateOfBirth}
        </p>
      </div>
    </div>
  ) : (
    <p className=" font-serif flex w-full flex-col items-center my-6">Loading data fails. Please try again later.</p>
  );
}
