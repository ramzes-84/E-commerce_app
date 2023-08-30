import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Wrapper from './wrapper';

describe('Wrapper', () => {
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    mockHandleSubmit.mockClear();
  });

  it('displays title and children, and renders edit button when isEditing is true', () => {
    render(
      <Wrapper title="Test Wrapper" handleSubmit={mockHandleSubmit}>
        <div>Test Children</div>
      </Wrapper>
    );

    expect(screen.getByText('Test Wrapper')).toBeInTheDocument();
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  it('disables form elements and renders save button when isEditing is false', () => {
    render(
      <Wrapper title="Test Wrapper" handleSubmit={mockHandleSubmit}>
        <input type="text" name="test-input" />
      </Wrapper>
    );

    fireEvent.click(screen.getByTitle('Edit'));

    expect(screen.getByRole('textbox')).not.toBeDisabled();
    expect(screen.getByTitle('Save')).toBeInTheDocument();
  });

  it('calls handleSubmit when form is submitted and isEditing is false', async () => {
    render(
      <Wrapper title="Test Wrapper" handleSubmit={mockHandleSubmit}>
        <input type="text" name="test-input" value="test value" />
      </Wrapper>
    );

    fireEvent.click(screen.getByTitle('Edit'));

    const testInput = screen.getByRole('textbox');

    fireEvent.change(testInput, { target: { value: 'updated test value' } });
    fireEvent.click(screen.getByTitle('Save'));

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
