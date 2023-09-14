import {
  getUserInfo,
  logout,
  returnCustomerData,
  updateAddressField,
  updateUserField,
  userIsLogged,
} from './account-actions';
import CustomerService from '@/service/api/CustomerService';

export const newCustomer = {
  email: 'test@test.com',
  password: '123456qQ',
  firstName: 'Lena',
  lastName: 'Tom',
  dateOfBirth: '1990-01-01',
  version: 1,
  addresses: [
    {
      id: '1',
      streetName: 'Baker st',
      city: 'London',
      postalCode: '12345',
      country: 'England',
    },
    {
      id: '2',
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
export const expectedData = {
  email: 'test@test.com',
  password: '123456qQ',
  firstName: 'Lena',
  lastName: 'Tom',
  dateOfBirth: '1990-01-01',
  version: 1,
  addresses: [
    {
      id: '1',
      streetName: 'Baker st',
      city: 'London',
      postalCode: '12345',
      country: 'England',
    },
    {
      id: '2',
      streetName: 'St',
      city: 'Paris',
      postalCode: '12345',
      country: 'Franc',
    },
  ],
  shippingAddressIds: ['1'],
  billingAddressIds: ['2'],
};
const myAddress = {
  id: 'string',
  country: 'string',
};

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

describe('Account action functions', () => {
  it('should call CustomerService class & class method on logout', () => {
    logout();
    expect(CustomerService).toHaveBeenCalledTimes(1);
    expect(mockLogout).toHaveBeenCalled();
  });
  it('should call class method on userIsLogged', () => {
    userIsLogged();
    expect(mockIsLogged).toHaveBeenCalled();
  });
  it('should call class method on getUserInfo', () => {
    getUserInfo();
    expect(mockGetCurrentCustomer).toHaveBeenCalled();
  });
  it('should call class method on updateUserField', () => {
    updateUserField(expectedData, 'string', 'setFirstName', 'string2');
    expect(mockUpdateFieldName).toHaveBeenCalled();
  });
  it('should call class method on updateAddressField', () => {
    updateAddressField(expectedData, 'changeAddress', myAddress);
    expect(mockChangeAddAddress).toHaveBeenCalled();
  });
});

describe('Function returnCustomerData', () => {
  test('returns the correct data', () => {
    expect(returnCustomerData(newCustomer)).toEqual(expectedData);
  });

  test('returns undefined when no customer', () => {
    expect(returnCustomerData(undefined)).toBeUndefined();
  });
});
