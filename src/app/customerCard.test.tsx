import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CustomerCard } from './CustomerCard';
import { Customer } from '@commercetools/platform-sdk';


const customer: Customer = {
  "id": "4a3b5783-6d4b-45b7-9c2a-f9268a6259c9",
  "version": 1,
  "createdAt": "2023-07-30T16:10:42.771Z",
  "lastModifiedAt": "2023-07-30T16:10:42.771Z",
  "email": "samplecustomer.germany@example.com",
  "firstName": "Sample Customer",
  "lastName": "Germany",
  "addresses": [
      {
          "id": "h90i8lf2",
          "firstName": "Sample Customer",
          "lastName": "Germany",
          "streetName": "Sample Street",
          "streetNumber": "1",
          "postalCode": "12345",
          "city": "Sample Town",
          "country": "DE"
      }
  ],
  "shippingAddressIds": [],
  "billingAddressIds": [],
  "isEmailVerified": false,
  "key": "123456",
  "stores": [],
  "authenticationMode": "ExternalAuth"
}
describe('Customer card', () => {
  it('renders a correct customer greeting', () => {
    render(<CustomerCard customer={customer} />);

    const greet = screen.getByText(/Sample Customer/);
    

    expect(greet).toBeInTheDocument();
  });
});