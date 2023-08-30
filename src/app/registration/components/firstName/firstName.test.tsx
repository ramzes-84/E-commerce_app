import { fireEvent, render, screen } from '@testing-library/react';
import { Dispatch } from 'react';
import FirstNameValid from './firstNameValid';

describe('FirstNameValid component', () => {
  const setFirstName: Dispatch<React.SetStateAction<string | undefined>> = jest.fn();

  test('renders correctly', () => {
    const firstName = 'Lena';
    render(<FirstNameValid firstName={firstName} setFirstName={setFirstName} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(firstName);
  });

  test('updates value on input change', () => {
    render(<FirstNameValid firstName="" setFirstName={setFirstName} />);
    const firstNameInput = screen.getByRole('textbox');
    fireEvent.change(firstNameInput, { target: { value: 'Lena' } });
  });

  test('show error message', () => {
    const { getByText } = render(<FirstNameValid firstName="" setFirstName={setFirstName} />);
    const firstNameInput = screen.getByRole('textbox');

    fireEvent.change(firstNameInput, { target: { value: '1!' } });
    expect(getByText('Must contain at least one character and no special characters or numbers')).toBeInTheDocument();
  });

  test('does not show error message', () => {
    const { queryByText } = render(<FirstNameValid firstName="" setFirstName={setFirstName} />);
    const firstNameInput = screen.getByRole('textbox');

    fireEvent.change(firstNameInput, { target: { value: 'Lena' } });
    expect(queryByText('Must contain at least one character and no special characters or numbers')).toBeNull();
  });
});
