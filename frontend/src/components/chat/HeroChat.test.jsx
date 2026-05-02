import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import HeroChat from './HeroChat';

// Mock the global fetch function
global.fetch = vi.fn();

describe('HeroChat Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default fetch mock for history
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ messages: [] })
    });
  });

  it('renders the chatbot with an initial greeting message', () => {
    render(<HeroChat />);
    expect(screen.getByText('VoteMate AI')).toBeInTheDocument();
    expect(screen.getByText('Hello! I am VoteMate AI. How can I help you today?')).toBeInTheDocument();
  });

  it('allows user to type and send a message', async () => {
    // Mock fetch for both history and chat submission
    fetch.mockImplementation((url) => {
      if (url && url.includes('/history/')) {
        return Promise.resolve({ ok: true, json: async () => ({ messages: [] }) });
      }
      return Promise.resolve({ ok: true, json: async () => ({ reply: "Here is your polling booth info." }) });
    });

    render(<HeroChat />);
    
    // Find the input field
    const inputField = screen.getByPlaceholderText(/Ask about voting/i);
    const sendButton = screen.getByRole('button', { name: 'Send message' });

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
    });
  });
});
