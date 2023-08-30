import React from 'react';
import { render, screen } from '@testing-library/react';
import Border from './border';

describe('Border', () => {
  it('renders title and children', () => {
    const title = 'Test Title';
    const children = <p>Test Children</p>;

    render(<Border title={title}>{children}</Border>);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});
