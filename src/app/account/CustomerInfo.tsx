import { useState } from 'react';
import { getUserInfo } from './account-actions';
import { Customer } from '@commercetools/platform-sdk';

export function CustomerInfo({ customer }: { customer: Customer }) {
  return (
    <>
      <p>Name: {customer.firstName}</p>
      <p>Lastname: {customer.lastName}</p>
      <p>Email: {customer.email}</p>
      <p>Birthday: {customer.dateOfBirth}</p>
    </>
  );
}
