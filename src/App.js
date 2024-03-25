import React, { useState } from 'react';
const api = {
  key: "7a55633dfd01cca1c4daa732947515b3",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      })
    }
  }

  let date = String(new window.Date())
  date = date.slice(3,15);

  return (
    <div className={
      (typeof weather.main != "undefined")
      ? ((weather.main.temp > 16)
        ? 'App warm'
        : 'App')
      : 'App'
    }>
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className="content">
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{date}</div>
          </div>
          <div className="weather-box">
            <div className="temperature">{Math.round(weather.main.temp)}°C</div>
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        ) : (
          <div className="content">
            <h3 className='notFound'>No location found with given name.</h3>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
