import { useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "a88a7ac3f95caef31324147c7433a2d3";

  const getWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
      } else if (data.cod == 401) {
        setWeather(null);
        alert("Invalid API Key");
      } else {
        setWeather(null);
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-title">Weather App</div>

      <input
        type="text"
        className="weather-input"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button className="weather-btn" onClick={getWeather}>
        Search
      </button>

      {weather && (
        <div className="weather-result">
          <h3>Temperature: {weather.main.temp}°C</h3>
          <h3>Humidity: {weather.main.humidity}%</h3>
          <h3>Wind Speed: {weather.wind.speed} m/s</h3>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
