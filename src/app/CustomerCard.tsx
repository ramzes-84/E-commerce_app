'use client';

import { Customer } from '@commercetools/platform-sdk';
import { FC } from 'react';

type PropsType = { customer: Customer };

export const CustomerCard: FC<PropsType> = ({ customer }) => {
  return (
    <>
      <p>Aloha {customer.firstName}!</p>
    </>
  );
};
