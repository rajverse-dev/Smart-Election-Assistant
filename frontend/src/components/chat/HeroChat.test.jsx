import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroChat from './HeroChat';

// Mock the global fetch function
global.fetch = vi.fn();

describe('HeroChat Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the chatbot with an initial greeting message', () => {
    render(<HeroChat />);
    expect(screen.getByText('VoteMate AI')).toBeInTheDocument();
    expect(screen.getByText('Hello! I am VoteMate AI. How can I help you today?')).toBeInTheDocument();
  });

  it('allows user to type and send a message', async () => {
    // Mock a successful API response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reply: "Here is your polling booth info." }),
    });

    render(<HeroChat />);
    
    // Find the input field (since we don't have aria-labels yet, we look for placeholder)
    const inputField = screen.getByPlaceholderText(/Type your message/i);
    const sendButton = screen.getByRole('button', { name: '' }); // We'll need to add aria-label to this later!

    // Type a message
    fireEvent.change(inputField, { target: { value: 'Where do I vote?' } });
    expect(inputField.value).toBe('Where do I vote?');

    // Submit the message
    fireEvent.click(sendButton);

    // Ensure the message appears in the chat
    expect(screen.getByText('Where do I vote?')).toBeInTheDocument();

    // Wait for the bot response to appear
    await waitFor(() => {
      expect(screen.getByText('Here is your polling booth info.')).toBeInTheDocument();
    }, { timeout: 1000 });
  });
});
