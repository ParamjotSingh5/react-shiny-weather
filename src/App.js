import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/currentWeather/current-weather';

function App() {

  const handleOnSearchChange = (searchData) =>{
    console.log(searchData);
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}></Search>
      <CurrentWeather/>
    </div>
  );
}

export default App;
