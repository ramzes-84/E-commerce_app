import React, { Dispatch } from 'react';
import { render, fireEvent } from '@testing-library/react';
import PasswordValid from './passwordValid';

describe('PasswordValid component', () => {
  test('renders correctly', () => {
    const { getByDisplayValue } = render(<PasswordValid password="123456qQ" onUpdate={() => {}} />);
    const passwordInput = getByDisplayValue('123456qQ');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('updates value on input change', () => {
    const { getByDisplayValue } = render(<PasswordValid password="123456qQ" onUpdate={() => {}} />);
    const passwordInput = getByDisplayValue('123456qQ');
    fireEvent.change(passwordInput, { target: { value: '123456mM' } });
  });

  test('show error message', () => {
    const { getByDisplayValue, getByText } = render(<PasswordValid password="123456qQ" onUpdate={() => {}} />);
    const passwordInput = getByDisplayValue('123456qQ');

    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    expect(
      getByText('Min 8 characters, at least 1 uppercase letter and 1 lowercase letter and 1 number')
    ).toBeInTheDocument();
  });

  test('does not show error message', () => {
    const { getByDisplayValue, queryByText } = render(<PasswordValid password="123456qQ" onUpdate={() => {}} />);
    const passwordInput = getByDisplayValue('123456qQ');

    fireEvent.change(passwordInput, { target: { value: '12345678vV' } });
    expect(queryByText('Min 8 characters, at least 1 uppercase letter and 1 lowercase letter and 1 number')).toBeNull();
  });

  test('toggles password visibility onclick', () => {
    const { getByDisplayValue, getByRole } = render(<PasswordValid password="123456qQ" onUpdate={() => {}} />);
    const passwordInput = getByDisplayValue('123456qQ');
    const toggle = getByRole('button');
    fireEvent.click(toggle);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggle);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
