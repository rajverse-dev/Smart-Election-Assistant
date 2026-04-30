exports.getNearbyBooths = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    
    // TODO: Integrate Google Maps Places API here
    // Mock response for now
    const mockBooths = [
      {
        id: "1",
        name: "Government High School, Block A",
        address: "Main Road, City Center",
        distance: "1.2 km",
        lat: 12.9716, // dummy coordinates
        lng: 77.5946
      },
      {
        id: "2",
        name: "Community Hall, Sector 4",
        address: "Sector 4 Market Area",
        distance: "2.5 km",
        lat: 12.9750,
        lng: 77.5900
      }
    ];

    res.status(200).json(mockBooths);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch nearby polling booths" });
  }
};
