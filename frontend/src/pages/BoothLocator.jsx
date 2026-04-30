import { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';

const BoothLocator = () => {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    // In a real app, we would get user's location using navigator.geolocation
    // and send it to the backend. Here we mock it.
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(`http://localhost:5000/api/location/booths?lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
            .then(res => res.json())
            .then(data => {
              setBooths(data);
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

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Find Polling Booth</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover polling stations near your current location.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-[500px] flex items-center justify-center border border-gray-100 dark:border-gray-700">
          {/* Mock Map View */}
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Google Maps Integration would render here.</p>
          </div>
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
          ) : (
            <div className="space-y-4">
              {booths.map(booth => (
                <div key={booth.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{booth.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{booth.address}</p>
                    <span className="inline-flex items-center text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                      {booth.distance} away
                    </span>
                  </div>
                  <button className="p-3 bg-primary-50 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-gray-600 text-primary-600 dark:text-primary-400 rounded-full transition-colors">
                    <Navigation className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoothLocator;
