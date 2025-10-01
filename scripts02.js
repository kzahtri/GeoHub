function fetchLiveData() {
    const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
    const container = document.getElementById('data-container');
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        container.innerHTML = '';
        const earthquakes = data.features.slice(0, 5); // Fetch latest 5 entries
        earthquakes.forEach(eq => {
          const magnitude = eq.properties.mag;
          const place = eq.properties.place;
          const time = new Date(eq.properties.time).toLocaleString();
  

          
          container.innerHTML += `
            <div class="card mb-2">
              <div class="card-body">
                <h5 class="card-title">Magnitude: ${magnitude}</h5>
                <p class="card-text">${place}</p>
                <small>${time}</small>
              </div>
            </div>
          `;
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        container.innerHTML = `<p class="text-danger">Error loading live data. Please try again later.</p>`;
      });
  }
  
  document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#learn-more').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});
ocument.querySelector('.cta-button').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('#learn-more').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
  });
});