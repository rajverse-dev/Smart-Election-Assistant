import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChatMessage from './ChatMessage';

describe('ChatMessage Component', () => {
  it('renders a user message correctly', () => {
    render(<ChatMessage message="Where do I vote?" sender="user" />);
    const msg = screen.getByText('Where do I vote?');
    expect(msg).toBeInTheDocument();
    // User messages use justify-end
    expect(msg.parentElement).toHaveClass('justify-end');
  });

  it('renders a bot message correctly', () => {
    render(<ChatMessage message="You can find your polling booth here." sender="bot" />);
    const msg = screen.getByText('You can find your polling booth here.');
    expect(msg).toBeInTheDocument();
    // Bot messages use justify-start
    expect(msg.parentElement).toHaveClass('justify-start');
  });
});
