import { fireEvent, render } from '@testing-library/react';
import PasswordChange from './passwordChange';
import { expectedData } from '../../account-action.test';

describe('PasswordChange', () => {
  const setSavePassword = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('open pop-up when edit button is clicked', () => {
    const { getByText, getByTitle } = render(
      <PasswordChange customer={expectedData} setSavePassword={setSavePassword} title="Change" />
    );

    const editButton = getByTitle('Edit');

    fireEvent.click(editButton);

    expect(getByText('To change the password for your Ostara Glass account, use this form')).toBeInTheDocument();
  });
  it('close pop-up when close button is clicked', () => {
    const { getByTitle } = render(
      <PasswordChange customer={expectedData} setSavePassword={setSavePassword} title="Change" />
    );

    const editButton = getByTitle('Edit');
    fireEvent.click(editButton);

    const closeButton = getByTitle('Exit');
    fireEvent.click(closeButton);

    expect(closeButton).not.toBeInTheDocument();
  });
});
