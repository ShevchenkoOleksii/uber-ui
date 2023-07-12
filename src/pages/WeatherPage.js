import React, {useState} from 'react';
import weatherPng from '../images/weather.png';

export const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [ready, setReady] = useState(false);
  let latitude = 0;
  let longitude = 0;
  let urlCoords = '';

  const fetchedWeather = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      urlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=08d1316ba8742c08076e7425c28c2614`;
      fetch(urlCoords)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
          setReady(true);
        })
        .catch(e => {
          console.log(e)
        });
    });
  };

  function hPaToMmHg(P) {
    return (P * 0.750061683).toFixed(1);
  }

  function meterPerSecToKmPerHour(metPerSec) {
    return metPerSec * 3.6;
  }

  if (!ready || !weatherData) {
    return <div>
      <button className="btn" onClick={fetchedWeather}>get weather</button>
    </div>
  }

  return (
    <div>
      <div className="row">
        <div className="col s4 offset-s4">
          <div className="card">
            <div className="card-image">
              <img src={weatherPng} alt="weather"/>
            </div>
            <div className="card-content">
              {weatherData.main && <table className="weather-data">
                <tbody>
                <tr>
                  <th>City</th>
                  <td><strong>{weatherData.name}</strong></td>
                </tr>
                <tr>
                  <th>Temperature</th>
                  <td>{(weatherData.main.temp).toFixed(1)} &ordm;C</td>
                </tr>
                <tr>
                  <th>Humidity</th>
                  <td>{weatherData.main.humidity} %</td>
                </tr>
                <tr>
                  <th>Pressure</th>
                  <td>{hPaToMmHg(weatherData.main.pressure)} mmHg</td>
                </tr>
                <tr>
                  <th>Wind Speed</th>
                  <td>{meterPerSecToKmPerHour(weatherData.wind.speed).toFixed(1)} km/h</td>
                </tr>
                </tbody>
              </table>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};