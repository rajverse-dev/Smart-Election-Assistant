import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BoothLocator from './BoothLocator';

// Mock APIProvider and Map from @vis.gl/react-google-maps
vi.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({ children }) => <div>{children}</div>,
  Map: () => <div data-testid="mock-map">Mock Map</div>,
  Marker: () => null,
}));

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: vi.fn().mockImplementation((success) =>
    success({
      coords: {
        latitude: 28.6139,
        longitude: 77.2090,
      },
    })
  ),
};
global.navigator.geolocation = mockGeolocation;

describe('BoothLocator Component', () => {
  it('renders correctly and shows loading state initially', () => {
    render(<BoothLocator />);
    expect(screen.getByText(/Loading map/i)).toBeInTheDocument();
  });

  it('renders the map after loading location', async () => {
    render(<BoothLocator />);
    // Since we mock geolocation successfully in the first call, it should resolve
    const map = await screen.findByTestId('mock-map');
    expect(map).toBeInTheDocument();
    expect(screen.getByText(/Nearby Booths/i)).toBeInTheDocument();
  });
});
