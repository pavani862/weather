import React, { useState } from 'react';

const API_KEY = 'b6378cf0e41f4315bfb125359250704'; // Replace with your WeatherAPI key

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await response.json();
      if (data.error) {
        setWeather({ error: data.error.message });
      } else {
        setWeather(data);
      }
    } catch (error) {
      setWeather({ error: 'Something went wrong.' });
    }
  };

  return (
    <div className="container">
      <h1>🌤 Weather App (WeatherAPI)</h1>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather?.current && (
        <div className="weather-info">
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <p>{weather.current.condition.text}</p>
          <p>🌡 {weather.current.temp_c} °C</p>
          <img src={weather.current.condition.icon} alt="icon" />
        </div>
      )}

      {weather?.error && <p className="error">⚠️ {weather.error}</p>}
    </div>
  );
}

export default App;
