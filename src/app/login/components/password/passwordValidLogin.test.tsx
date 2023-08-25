import React, { Dispatch } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IFormDataLogin } from '../../LoginForm';
import PasswordValidLogin from './passwordValidLogin';

describe('PasswordValidLogin component', () => {
  const setFormData: Dispatch<React.SetStateAction<IFormDataLogin>> = jest.fn();

  test('renders correctly', () => {
    const { getByLabelText } = render(<PasswordValidLogin password="" setFormData={setFormData} />);
    const passwordInput = getByLabelText('Password: *');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('updates value on input change', () => {
    const { getByLabelText } = render(<PasswordValidLogin password="" setFormData={setFormData} />);
    const passwordInput = getByLabelText('Password: *');
    fireEvent.change(passwordInput, { target: { value: '123456mM' } });
  });

  test('show error message', () => {
    const { getByLabelText, getByText } = render(<PasswordValidLogin password="" setFormData={setFormData} />);
    const passwordInput = getByLabelText('Password: *');

    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    expect(
      getByText('Min 8 characters, at least 1 uppercase letter and 1 lowercase letter and 1 number')
    ).toBeInTheDocument();
  });

  test('does not show error message', () => {
    const { getByLabelText, queryByText } = render(<PasswordValidLogin password="" setFormData={setFormData} />);
    const passwordInput = getByLabelText('Password: *');

    fireEvent.change(passwordInput, { target: { value: '12345678vV' } });
    expect(queryByText('Min 8 characters, at least 1 uppercase letter and 1 lowercase letter and 1 number')).toBeNull();
  });

  test('toggles password visibility onclick', () => {
    const { getByLabelText, getByRole } = render(<PasswordValidLogin password="" setFormData={setFormData} />);
    const passwordInput = getByLabelText('Password: *');
    const toggle = getByRole('button');
    fireEvent.click(toggle);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggle);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
