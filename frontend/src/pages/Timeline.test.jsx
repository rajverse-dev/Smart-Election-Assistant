import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Timeline from './Timeline';

global.fetch = vi.fn();

describe('Timeline Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });
    render(<Timeline />);
    expect(screen.getByText(/Loading timeline/i)).toBeInTheDocument();
  });

  it('renders events correctly after fetching', async () => {
    const mockEvents = [
      { id: 1, title: 'Registration Start', date: '2026-05-01', description: 'desc 1' },
      { id: 2, title: 'Voting Day', date: '2026-05-20', description: 'desc 2' },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockEvents
    });

    render(<Timeline />);
    
    await waitFor(() => {
      expect(screen.getByText('Registration Start')).toBeInTheDocument();
      expect(screen.getByText('Voting Day')).toBeInTheDocument();
    });
  });
});
