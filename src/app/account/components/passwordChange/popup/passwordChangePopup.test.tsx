import { render, screen, fireEvent } from '@testing-library/react';
import ChangePasswordPopup from './passwordChangePopup';

describe('ChangePasswordPopup', () => {
  const onClose = jest.fn();

  it('renders children and button Close', () => {
    render(
      <ChangePasswordPopup onClose={onClose}>
        <div>Test</div>
      </ChangePasswordPopup>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByTitle('Exit')).toBeInTheDocument();
  });

  it('calls onClose when button Close is clicked', () => {
    render(
      <ChangePasswordPopup onClose={onClose}>
        <div>Test</div>
      </ChangePasswordPopup>
    );

    const closeButton = screen.getByTitle('Exit');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
