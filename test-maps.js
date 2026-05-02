async function testMapsKey() {
  const key = 'AIzaSyD0rKhvEpUql0y5s6U_xsGahpnCKps88bE';
  try {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=India&key=${key}`);
    const data = await res.json();
    console.log("Google Maps API Response:", data);
  } catch(e) {
    console.error("Fetch failed", e);
  }
}
testMapsKey();
