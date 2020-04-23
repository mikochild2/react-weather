import React, { useState } from 'react';
const api = {
  key: "5da30f169f062c2efa7163d1590436ee",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
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
    <div className="App warm">
      <main>
        <div className="search-box">
          <input 
          type="text" class="search-bar" placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        <div className="location-box">
          <div className="location">Charlotte, NC</div>
          <div className="date">   {dateBuilder(new Date)}
          </div>

        </div>
        <div className="weather-box">
          <div className="temp">
            15°C
          </div>
          <div className="weather">
            Sunny
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
