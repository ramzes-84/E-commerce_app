import React from 'react';
import { render, screen } from '@testing-library/react';
import SuccessPopup from './successPopup';

describe('SuccessPopup', () => {
  it('displays success message when successChange is true', () => {
    const message = 'Success Message';
    const successChange = true;
    const errorChange = false;

    render(<SuccessPopup message={message} successChange={successChange} errorChange={errorChange} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('displays error message when errorChange is true', () => {
    const message = 'Error Message';
    const successChange = false;
    const errorChange = true;

    render(<SuccessPopup message={message} successChange={successChange} errorChange={errorChange} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('does not display anything when successChange and errorChange are false', () => {
    const message = 'Test Message';
    const successChange = false;
    const errorChange = false;

    render(<SuccessPopup message={message} successChange={successChange} errorChange={errorChange} />);

    expect(screen.queryByText(message)).toBeNull();
  });
});
