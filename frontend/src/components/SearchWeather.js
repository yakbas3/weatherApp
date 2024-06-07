import React, { useState } from 'react';
import { getWeatherDataByCityAndDate } from '../services/api';
import { Typography } from '@mui/material';
import Layout from '../components/Layout';

const SearchWeather = () => {
  const [searchCity, setSearchCity] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'searchCity') {
      setSearchCity(value);
    } else if (name === 'searchDate') {
      setSearchDate(value);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getWeatherDataByCityAndDate(searchCity, searchDate);
      setWeatherData(response);
    } catch (error) {
      console.error('Error searching weather data', error);
    }
  };

  return (

    <Layout>
      
      <div>
      <h2>Search Weather Data</h2>
      <form onSubmit={handleSearchSubmit}>
        <div>
          <label>City</label>
          <input
            type="text"
            name="searchCity"
            value={searchCity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="searchDate"
            value={searchDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {weatherData && (
        <div>
          <h3>Weather Data for {searchCity} on {searchDate}</h3>
          <table>
            <thead>
              <tr>
                <th>City Name</th>
                <th>Weather Date</th>
                <th>Temperature</th>
                <th>Main Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{weatherData.cityName}</td>
                <td>{weatherData.weatherDate}</td>
                <td>{weatherData.temperature}</td>
                <td>{weatherData.mainStatus}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
    </Layout>

    
  );
};

export default SearchWeather;
