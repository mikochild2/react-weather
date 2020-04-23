import React, { useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'
const api = {
  key: "5da30f169f062c2efa7163d1590436ee",
  base: "https://api.openweathermap.org/data/2.5/"
}
//const sun = <FontAwesomeIcon icon={faCoffee} />


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
            </div>
            <div className="weather">
              {weather.weather[0].main}</div>
          </div>
        </div>
        ) : (<p>Please Enter a Zip Code</p>)}
      </main>
    </div>
  );
}

export default App;
