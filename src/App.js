import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSun, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './assets/weather app logo3.png';

library.add(fab, faSun, faCoffee)

var moment = require('moment');

const api = {
  key: "5da30f169f062c2efa7163d1590436ee",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?zip=${query},us&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

const dateBuilder = (d)   => {
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[d.getDay()];
let date = d.getDate();
let month = months[d.getMonth()];
let year = d.getFullYear();

return `${day}, ${month} ${date}, ${year}`
}

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp >60) ? 'App warm' : 'App') : 'App'}>
      <main>
      <div><img className="top-logo" src={logo} alt="logo" /></div>
        <div className="search-box">
          <input 
          type="text" class="search-bar" placeholder="Zip Code..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location"> {weather.name} </div>
            <div className="date">   {dateBuilder(new Date)}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°F
              <p>Feels like: {Math.round(weather.main.feels_like)}°F </p> 
              <p>Humidity: {weather.main.humidity} </p>
              <p>Pressure: {weather.main.pressure} </p>
              <p>Hi/Lo {Math.round(weather.main.temp_max)}°F/{Math.round(weather.main.temp_min)}°F  </p>
              <p>Sunrise: {new Date(weather.sys.sunrise).toLocaleTimeString()}</p>
              <p>Sunset: {new Date(weather.sys.sunset).toLocaleTimeString()}</p>
            </div>
            <div className="weather">
              {weather.weather[0].main}</div>
          </div>
          </div>
        ) : (<div class="no-weather"><p>Please enter a zip code in the box above <FontAwesomeIcon icon="sun" color="white" spin /></p></div>)} 
      </main>
    </div>
  );
}

export default App;
