'use client';

import { useRouter } from 'next/router';
import { getCategories } from './categories-actions';
import React from 'react';

export default function Page() {
  const [categories, setCategories] = React.useState('Loading...');
  getCategories()
    .then((res) => res.join(', '))
    .then((cats) => setCategories(cats));

  return (
    <>
      <h1>Catalog Page</h1>
    </>
  );
}
