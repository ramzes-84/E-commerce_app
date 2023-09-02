import { fireEvent, render } from '@testing-library/react';
import PasswordChange from './passwordChange';

describe('PasswordChange', () => {
  const setPassword = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('update password when input password change', () => {
    const setPassword = jest.fn();
    const { getByTestId } = render(<PasswordChange password="password" setPassword={setPassword} title="Change" />);

    const input = getByTestId('input-password');

    fireEvent.change(input, { target: { value: '123456qQ' } });

    expect(setPassword).toHaveBeenCalledWith('123456qQ');
  });

  it('open pop-up when edit button is clicked', () => {
    const { getByText, getByTitle } = render(
      <PasswordChange password="password" setPassword={setPassword} title="Change" />
    );

    const editButton = getByTitle('Edit');

    fireEvent.click(editButton);

    expect(getByText('To change the password for your Ostara Glass account, use this form')).toBeInTheDocument();
  });
  it('close pop-up when close button is clicked', () => {
    const { getByTitle } = render(<PasswordChange password="password" setPassword={setPassword} title="Change" />);

    const editButton = getByTitle('Edit');
    fireEvent.click(editButton);

    const closeButton = getByTitle('Exit');
    fireEvent.click(closeButton);

    expect(closeButton).not.toBeInTheDocument();
  });
});
