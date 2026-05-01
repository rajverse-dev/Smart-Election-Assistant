import { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const BoothLocator = () => {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState('');
  const [userLocation, setUserLocation] = useState({ lat: 20.5937, lng: 78.9629 }); // Default to India center

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng });

          fetch(`http://localhost:5000/api/location/booths?lat=${lat}&lng=${lng}`)
            .then(res => res.json())
            .then(data => {
              if (Array.isArray(data)) {
                 setBooths(data);
              } else {
                 console.error("Expected array but got:", data);
                 setBooths([]);
              }
              setLoading(false);
            })
            .catch(err => {
              console.error(err);
              setLoading(false);
            });
        },
        (error) => {
          setLocationError('Please enable location access to find nearby booths.');
          setLoading(false);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, []);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  return (
    <APIProvider apiKey={googleMapsApiKey}>
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Find Polling Booth</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover polling stations near your current location.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 h-[500px] flex items-center justify-center border border-gray-100 dark:border-gray-700 overflow-hidden relative">
            {googleMapsApiKey ? (
              <Map
                defaultZoom={14}
                defaultCenter={userLocation}
                center={userLocation}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
              >
                {/* User Location Marker */}
                <Marker position={userLocation} title="Your Location" />
                
                {/* Booth Markers */}
                {booths.map(booth => (
                  <Marker 
                    key={booth.id} 
                    position={{ lat: booth.lat, lng: booth.lng }} 
                    title={booth.name}
                  />
                ))}
              </Map>
            ) : (
              <div className="text-center p-6">
                <MapPin className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Map unavailable. Please configure your VITE_GOOGLE_MAPS_API_KEY in frontend/.env</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary-500" /> Nearby Booths
            </h2>
            
            {loading ? (
              <p className="text-gray-500">Searching for booths...</p>
            ) : locationError ? (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg">
                {locationError}
              </div>
            ) : booths.length === 0 ? (
               <p className="text-gray-500">No booths found near you.</p>
            ) : (
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
                {booths.map(booth => (
                  <div key={booth.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{booth.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{booth.address}</p>
                      <span className="inline-flex items-center text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                        {booth.distance} away
                      </span>
                    </div>
                    <button 
                      className="p-3 bg-primary-50 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-gray-600 text-primary-600 dark:text-primary-400 rounded-full transition-colors"
                      onClick={() => {
                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${booth.lat},${booth.lng}`, '_blank');
                      }}
                    >
                      <Navigation className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

export default BoothLocator;
