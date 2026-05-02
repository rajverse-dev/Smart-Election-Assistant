import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChatInput from './ChatInput';

describe('ChatInput Component', () => {
  it('renders correctly and has a disabled send button initially', () => {
    render(<ChatInput onSendMessage={() => {}} />);
    const input = screen.getByPlaceholderText(/Ask about voting/i);
    const sendButton = screen.getByRole('button', { name: 'Send message' });
    
    expect(input).toBeInTheDocument();
    expect(sendButton).toBeDisabled();
  });

  it('enables the send button when typing', () => {
    render(<ChatInput onSendMessage={() => {}} />);
    const input = screen.getByPlaceholderText(/Ask about voting/i);
    const sendButton = screen.getByRole('button', { name: 'Send message' });

    fireEvent.change(input, { target: { value: 'How do I register?' } });
    expect(sendButton).not.toBeDisabled();
  });

  it('calls onSendMessage and clears input upon submission', () => {
    const mockOnSendMessage = vi.fn();
    render(<ChatInput onSendMessage={mockOnSendMessage} />);
    
    const input = screen.getByPlaceholderText(/Ask about voting/i);
    const sendButton = screen.getByRole('button', { name: 'Send message' });

    fireEvent.change(input, { target: { value: 'Is there a polling booth near me?' } });
    fireEvent.click(sendButton);

    expect(mockOnSendMessage).toHaveBeenCalledWith('Is there a polling booth near me?');
    expect(input.value).toBe('');
  });
});
