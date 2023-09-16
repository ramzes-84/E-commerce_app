import { fireEvent, render, screen } from '@testing-library/react';
import { Dispatch } from 'react';
import LastNameValid from './lastNameValid';

describe('LastNameValid component', () => {
  const setLastName: Dispatch<React.SetStateAction<string | undefined>> = jest.fn();

  test('renders correctly', () => {
    const lastName = 'Doe';
    render(<LastNameValid lastName={lastName} setLastName={setLastName} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(lastName);
  });

  test('renders correctly if value is undefined', () => {
    render(<LastNameValid lastName={undefined} setLastName={setLastName} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('updates value on input change', () => {
    render(<LastNameValid lastName="" setLastName={setLastName} />);
    const lastNameInput: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  });

  test('show error message', () => {
    const { getByText } = render(<LastNameValid lastName="" setLastName={setLastName} />);
    const lastNameInput: HTMLInputElement = screen.getByRole('textbox');

    fireEvent.change(lastNameInput, { target: { value: '1' } });
    expect(getByText('Must contain at least one character and no special characters or numbers')).toBeInTheDocument();
  });

  test('does not show error message', () => {
    const { queryByText } = render(<LastNameValid lastName="" setLastName={setLastName} />);
    const lastNameInput: HTMLInputElement = screen.getByRole('textbox');

    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    expect(queryByText('Must contain at least one character and no special characters or numbers')).toBeNull();
  });
});
