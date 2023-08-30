import { Customer } from '@commercetools/platform-sdk';
import { returnCustomerData } from './account-actions';
import { IMyCustomer } from '@/service/api/CustomerService';

describe('Function returnCustomerData', () => {
  test('returns the correct data', () => {
    const newCustomer: Customer = {
      email: 'test@test.com',
      password: '123456qQ',
      firstName: 'Lena',
      lastName: 'Tom',
      dateOfBirth: '1990-01-01',
      version: 1,
      addresses: [
        {
          id: '1',
          key: 'shipping',
          streetName: 'Baker st',
          city: 'London',
          postalCode: '12345',
          country: 'England',
        },
        {
          id: '2',
          key: 'billing',
          streetName: 'St',
          city: 'Paris',
          postalCode: '12345',
          country: 'Franc',
        },
      ],
      shippingAddressIds: ['1'],
      billingAddressIds: ['2'],
      id: '',
      createdAt: '',
      lastModifiedAt: '',
      isEmailVerified: false,
      authenticationMode: '',
    };

    const expectedData: IMyCustomer = {
      email: 'test@test.com',
      password: '123456qQ',
      firstName: 'Lena',
      lastName: 'Tom',
      dateOfBirth: '1990-01-01',
      version: 1,
      addresses: [
        {
          id: '1',
          key: 'shipping',
          streetName: 'Baker st',
          city: 'London',
          postalCode: '12345',
          country: 'England',
        },
        {
          id: '2',
          key: 'billing',
          streetName: 'St',
          city: 'Paris',
          postalCode: '12345',
          country: 'Franc',
        },
      ],
      shippingAddressIds: ['1'],
      billingAddressIds: ['2'],
    };

    expect(returnCustomerData(newCustomer)).toEqual(expectedData);
  });

  test('returns undefined when no customer', () => {
    expect(returnCustomerData(undefined)).toBeUndefined();
  });
});
