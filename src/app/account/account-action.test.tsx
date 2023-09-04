import { Customer } from '@commercetools/platform-sdk';
import {
  getUserInfo,
  logout,
  returnCustomerData,
  updateAddressField,
  updateUserField,
  userIsLogged,
} from './account-actions';
import CustomerService, { IMyAddress, IMyCustomer } from '@/service/api/CustomerService';

export const newCustomer: Customer = {
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

export const expectedData: IMyCustomer = {
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

const myAddress: IMyAddress = {
  id: 'string',
  key: 'string',
  country: 'string',
};

describe('Function returnCustomerData', () => {
  test('returns the correct data', () => {
    expect(returnCustomerData(newCustomer)).toEqual(expectedData);
  });

  test('returns undefined when no customer', () => {
    expect(returnCustomerData(undefined)).toBeUndefined();
  });
});

const mockLogout = jest.fn();
const mockGetCurrentCustomer = jest.fn();
const mockIsLogged = jest.fn();
const mockUpdateFieldName = jest.fn();
const mockChangeAddAddress = jest.fn();
jest.mock('@/service/api/CustomerService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      logout: mockLogout,
      getCurrentCustomer: mockGetCurrentCustomer,
      isLogged: mockIsLogged,
      updateFieldName: mockUpdateFieldName,
      changeAddAddress: mockChangeAddAddress,
    };
  });
});

beforeEach(() => {
  (CustomerService as jest.Mock).mockClear();
});

describe('Account action functions', () => {
  //   it('shold call CustomerService class & class method on logout', () => {
  //     logout();
  //     expect(CustomerService).toHaveBeenCalledTimes(1);
  //     expect(mockLogout).toHaveBeenCalled();
  //   });
  // it('shold call CustomerService class & class method on userIsLogged', () => {
  //   userIsLogged();
  //   expect(CustomerService).toHaveBeenCalledTimes(1);
  //   expect(mockIsLogged).toHaveBeenCalled();
  // });
  // it('shold call CustomerService class & class method on getUserInfo', () => {
  //   getUserInfo();
  //   expect(CustomerService).toHaveBeenCalledTimes(1);
  //   expect(mockGetCurrentCustomer).toHaveBeenCalled();
  // });
  // it('shold call CustomerService class & class method on updateUserField', () => {
  //   updateUserField(expectedData, 'string', 'setFirstName', 'string2');
  //   expect(CustomerService).toHaveBeenCalledTimes(1);
  //   expect(mockUpdateFieldName).toHaveBeenCalled();
  // });
  // it('shold call CustomerService class & class method on updateAddressField', () => {
  //   updateAddressField(expectedData, 'changeAddress', myAddress);
  //   expect(CustomerService).toHaveBeenCalledTimes(1);
  //   expect(mockChangeAddAddress).toHaveBeenCalled();
  // });
});
