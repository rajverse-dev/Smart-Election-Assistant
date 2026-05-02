/**
 * Fetches nearby polling booths using Google Places API (New).
 * Searches for schools and community halls within a 5km radius of the provided coordinates.
 * 
 * @param {Object} req - Express request object containing lat and lng in query
 * @param {Object} res - Express response object
 */
exports.getNearbyBooths = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    
    if (!process.env.GOOGLE_MAPS_API_KEY) {
      return res.status(500).json({ 
        error: "Google Maps API key is not configured. Please add GOOGLE_MAPS_API_KEY to your backend .env file." 
      });
    }

    if (!lat || !lng) {
       return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    // Call Google Places API (New) - Text Search
    const url = 'https://places.googleapis.com/v1/places:searchText';
    
    const requestBody = {
      textQuery: "school OR community hall OR polling booth",
      locationBias: {
        circle: {
          center: {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng)
          },
          radius: 5000.0
        }
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName.text,places.formattedAddress,places.location',
        'Referer': 'https://smart-election-assistant-837090440574.us-central1.run.app'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Google Places API error:", data);
      return res.status(500).json({ error: "Failed to fetch from Google Places API" });
    }

    // Transform Google Places results to match our expected format
    const booths = (data.places || []).slice(0, 5).map((place, index) => ({
      id: place.id || String(index),
      name: place.displayName?.text || "Polling Booth",
      address: place.formattedAddress || "Address not available",
      distance: "Approx " + (Math.random() * 3 + 0.5).toFixed(1) + " km", // Mock distance
      lat: place.location?.latitude,
      lng: place.location?.longitude
    }));

    res.status(200).json(booths);
  } catch (error) {
    console.error("Location API Error:", error);
    res.status(500).json({ error: "Failed to fetch nearby polling booths" });
  }
};
