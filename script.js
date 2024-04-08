function getWeather() {
  const apiKey = '1bf293e9a835f85418404756efffb4fa';
  const city = document.getElementById('city').value;

  if (!city) {
      alert('Nom de ville incorrect');
      return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
      .then(response => response.json())
      .then(data => {
          displayWeather(data);
      })
      .catch(error => {
          console.error('Erreur avec les données météo:', error);
          alert('Erreur avec les données météo actuelles, réessayer.');
      });

  fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
          displayHourlyForecast(data.list);
      })
      .catch(error => {
          console.error('Erreur avec les données météo:', error);
          alert('Erreur avec les données météo actuelles, réessayer..');
      });
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById('temp-div');
  const weatherInfoDiv = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');
  const hourlyForecastDiv = document.getElementById('hourly-forecast');

  // Effacer les précédentes données
  weatherInfoDiv.innerHTML = '';
  hourlyForecastDiv.innerHTML = '';
  tempDivInfo.innerHTML = '';

  if (data.cod === '404') {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15); // Convertir en celsius
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

      const temperatureHTML = `
          <p>${temperature}°C</p>
      `;

      const weatherHtml = `
          <p>${cityName}</p>
          <p>${description}</p>
      `;

      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHtml;
      weatherIcon.src = iconUrl;
      weatherIcon.alt = description;

      showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById('hourly-forecast');

  const next24Hours = hourlyData.slice(0, 8); // Afficher le résultat des 24 prochaines heures 

  next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000); // Convertir le timestamp en milliseconde
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15); // Convertir en celsius
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const hourlyItemHtml = `
          <div class="hourly-item">
              <span>${hour}:00</span>
              <img src="${iconUrl}" alt="Hourly Weather Icon">
              <span>${temperature}°C</span>
          </div>
      `;

      hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.style.display = 'block'; // Afficher l'image une fois les résultats chargés
}