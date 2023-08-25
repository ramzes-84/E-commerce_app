import { fireEvent, render, screen } from '@testing-library/react';
import { Dispatch } from 'react';
import EmailLoginValid from './emailValidLogin';
import { IFormDataLogin } from '../../LoginForm';

describe('EmailLoginValid component', () => {
  const setFormData: Dispatch<React.SetStateAction<IFormDataLogin>> = jest.fn();

  test('renders correctly', () => {
    const email = 'example@example.com';
    render(<EmailLoginValid email={email} setFormData={setFormData} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(email);
  });

  test('updates value on input change', () => {
    render(<EmailLoginValid email="" setFormData={setFormData} />);
    const emailInput = screen.getByRole('textbox');
    fireEvent.change(emailInput, { target: { value: 'example@test.com' } });
  });

  test('show error message', () => {
    const { getByText } = render(<EmailLoginValid email="" setFormData={setFormData} />);
    const emailInput = screen.getByRole('textbox');

    fireEvent.change(emailInput, { target: { value: 'exampletest.com' } });
    expect(
      getByText('Enter email in format example@example.ex without leading or trailing whitespace')
    ).toBeInTheDocument();
  });

  test('does not show error message', () => {
    const { queryByText } = render(<EmailLoginValid email="" setFormData={setFormData} />);
    const emailInput = screen.getByRole('textbox');

    fireEvent.change(emailInput, { target: { value: 'example@test.com' } });
    expect(queryByText('Enter email in format example@example.ex without leading or trailing whitespace')).toBeNull();
  });
});
