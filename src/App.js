import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/currentWeather/current-weather';
import { openWeatherAPIUrl, openWeatherAPIKey } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) =>{
    const [lat, lon] = searchData.value.split("&");

    const currentWeatherFetch = fetch(`${openWeatherAPIUrl}weather?lat=${lat}&lon=${lon}&appid=${openWeatherAPIKey}&units=metric`);
    const weatherForecastFetch = fetch(`${openWeatherAPIUrl}forecast?lat=${lat}&lon=${lon}&appid=${openWeatherAPIKey}&units=metric`);

    Promise.all([currentWeatherFetch, weatherForecastFetch])
      .then(async (responses) => {
        const currentWeatherResponse = await responses[0].json();
        const weatherForecastResponse = await responses[1].json();

        setCurrentWeather({city: searchData.label, ...currentWeatherResponse});
        setForecastWeather({city: searchData.label, ...weatherForecastResponse});
      })
      .catch( (ex) =>{
        console.log(ex);
      })
  }

  console.log(currentWeather);
  console.log(forecastWeather);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}></Search>
      
      {currentWeather && <CurrentWeather data={currentWeather}/>} 
      {forecastWeather && <Forecast data={forecastWeather}/> }
    </div>
  );
}

export default App;
