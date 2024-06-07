import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { Typography } from '@mui/material';
import Layout from '../components/Layout';

const WeatherDataAdministration = () => {
  const { authTokens } = useContext(AuthContext);
  const [weatherData, setWeatherData] = useState([]);
  const [formData, setFormData] = useState({
    cityName: '',
    weatherDate: '',
    temperature: '',
    mainStatus: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:5226/api/WeatherInfo');
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await updateWeatherData();
    } else {
      await createWeatherData();
    }

    fetchWeatherData();
    setFormData({
      cityName: '',
      weatherDate: '',
      temperature: '',
      mainStatus: '',
    });
    setIsEditing(false);
  };

  const createWeatherData = async () => {
    try {
      await axios.post('http://localhost:5226/api/WeatherInfo', formData, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      });
    } catch (error) {
      console.error('Error creating weather data', error);
    }
  };

  const updateWeatherData = async () => {
    try {
      await axios.put(`http://localhost:5226/api/WeatherInfo/${formData.cityName}/${formData.weatherDate}`, formData, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      });
    } catch (error) {
      console.error('Error updating weather data', error);
    }
  };

  const deleteWeatherData = async (cityName, weatherDate) => {
    try {
      await axios.delete(`http://localhost:5226/api/WeatherInfo/${cityName}/${weatherDate}`, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      });
      fetchWeatherData();
    } catch (error) {
      console.error('Error deleting weather data', error);
    }
  };

  const handleEdit = (data) => {
    setFormData(data);
    setIsEditing(true);
  };

  return (

    <Layout>
      <Typography variant="h2" gutterBottom align="center" color="textPrimary">
        Profile Page
      </Typography>
      <Typography variant="body1" gutterBottom align="center" color="textPrimary">
        This is the profile page.
      </Typography>
      <div>
      <h2>Weather Data Administration</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>City Name</label>
          <input
            type="text"
            name="cityName"
            value={formData.cityName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Weather Date</label>
          <input
            type="date"
            name="weatherDate"
            value={formData.weatherDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Temperature</label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Main Status</label>
          <input
            type="text"
            name="mainStatus"
            value={formData.mainStatus}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
      </form>
      <h3>Existing Weather Data</h3>
      <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Weather Date</th>
            <th>Temperature</th>
            <th>Main Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((data) => (
            <tr key={`${data.cityName}-${data.weatherDate}`}>
              <td>{data.cityName}</td>
              <td>{data.weatherDate}</td>
              <td>{data.temperature}</td>
              <td>{data.mainStatus}</td>
              <td>
                <button onClick={() => handleEdit(data)}>Edit</button>
                <button onClick={() => deleteWeatherData(data.cityName, data.weatherDate)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </Layout>

      );
};

export default WeatherDataAdministration;
