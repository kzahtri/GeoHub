async function fetchEarthquakeData() {
    const apiUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const earthquakes = data.features;
  
      const tableBody = document.getElementById("earthquake-data");
      tableBody.innerHTML = "";
  
      earthquakes.forEach((quake) => {
        const { mag, place, time } = quake.properties;
        const depth = quake.geometry.coordinates[2];
        const date = new Date(time).toLocaleString();
  
        const row = `
          <tr>
            <td>${date}</td>
            <td>${place}</td>
            <td>${mag}</td>
            <td>${depth}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    } catch (error) {
      console.error("Error fetching earthquake data:", error);
      const tableBody = document.getElementById("earthquake-data");
      tableBody.innerHTML = "<tr><td colspan='4'>Error loading data. Please try again later.</td></tr>";
    }
  }
  
  // Initialize Data Fetch
  fetchEarthquakeData();

  // Initialize Leaflet map
const map = L.map('map').setView([0, 0], 2); // World view centered at [lat, lng]

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Fetch Earthquake Data for Interactive Map
async function addEarthquakeMarkersToMap() {
  const apiUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const earthquakes = data.features;

    earthquakes.forEach((quake) => {
      const { mag, place, time } = quake.properties;
      const [lng, lat, depth] = quake.geometry.coordinates; // GeoJSON: [lng, lat, depth]
      const date = new Date(time).toLocaleString();

      // Add markers to the map
      const marker = L.circleMarker([lat, lng], {
        radius: mag * 2, // Magnitude determines marker size
        color: mag >= 5 ? "red" : "orange",
        fillOpacity: 0.6,
      }).addTo(map);

      // Add a popup with earthquake details
      marker.bindPopup(`
        <strong>Location:</strong> ${place}<br>
        <strong>Magnitude:</strong> ${mag}<br>
        <strong>Depth:</strong> ${depth} km<br>
        <strong>Date:</strong> ${date}
      `);
    });
  } catch (error) {
    console.error("Error fetching earthquake data:", error);
  }
}

// Load earthquake markers on the map
addEarthquakeMarkersToMap();
