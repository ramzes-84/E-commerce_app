import { render } from '@testing-library/react';
import InputPasswordChange from './inputPasswordChange';
import React from 'react';

describe('InputPasswordChange', () => {
  it('renders form and labels', () => {
    const { getByText } = render(
      <InputPasswordChange onUpdateOldPass={() => {}} onUpdateNewPass={() => {}} onUpdateConfirmPass={() => {}} />
    );

    expect(getByText("Change password")).toBeInTheDocument();
    expect(getByText("To change the password for your Ostara Glass account, use this form")).toBeInTheDocument();
    expect(getByText('Reset')).toBeInTheDocument();
    expect(getByText('Save')).toBeInTheDocument();
  });

  it('should disable save button when form is invalid', () => {
    const { getByText } = render(
      <InputPasswordChange onUpdateOldPass={() => {}} onUpdateNewPass={() => {}} onUpdateConfirmPass={() => {}} />
    );
    const saveButton = getByText('Save');
    expect(saveButton).toBeDisabled();
  });
});
