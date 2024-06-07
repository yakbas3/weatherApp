import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../auth/AuthContext';
import { getWeatherDataByCityForWeek, getTodayWeather, updateUserCity } from '../services/api';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Typography, Button, Box, TextField } from '@mui/material';
import Layout from '../components/Layout';
import sunnyImage from '../images/sunny.jpg';
import cloudyImage from '../images/cloudy.jpg';
import rainyImage from '../images/rainy.jpg';
import foggyImage from '../images/foggy.jpg';
import snowyImage from '../images/snowy.jpg';
import sunnyIcon from '../images/icons/sunny.png';
import cloudyIcon from '../images/icons/cloudy.png';
import rainyIcon from '../images/icons/rainy.png';
import foggyIcon from '../images/icons/foggy.png';
import snowyIcon from '../images/icons/snowy.png';

const weatherImages = {
  sunny: sunnyImage,
  cloudy: cloudyImage,
  rainy: rainyImage,
  foggy: foggyImage,
  snowy: snowyImage,
};

const weatherIcons = {
  sunny: sunnyIcon,
  cloudy: cloudyIcon,
  rainy: rainyIcon,
  foggy: foggyIcon,
  snowy: snowyIcon,
};

const Home = () => {
  const { authTokens } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [todayWeather, setTodayWeather] = useState(null);
  const [userCity, setUserCity] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    if (authTokens) {
      const decodedToken = jwtDecode(authTokens);
      setUserCity(decodedToken.city || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/city"]);
      if (decodedToken.role === 'admin' || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'admin') {
        setIsAdmin(true);
      }
    }
  }, [authTokens]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (userCity) {
        try {
          const [todayData, weekData] = await Promise.all([
            getTodayWeather(userCity),
            getWeatherDataByCityForWeek(userCity),
          ]);
          setTodayWeather(todayData);
          setWeatherData(weekData);
          if (todayData && todayData.mainStatus) {
            setBackgroundImage(weatherImages[todayData.mainStatus.toLowerCase()]);
          }
        } catch (error) {
          console.error('Error fetching weather data', error);
        }
      }
    };
    fetchWeatherData();
  }, [userCity]);

  const handleCityChange = async (e) => {
    e.preventDefault();
    try {
      await updateUserCity(newCity, authTokens);
      setUserCity(newCity);
      setNewCity('');
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };

  const chartData = {
    labels: weatherData.map(data => new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(data.weatherDate))),
    datasets: [
      {
        data: weatherData.map(data => data.temperature),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: (value) => `${value}°C`,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Layout backgroundImage={backgroundImage}>
      {todayWeather && (
        <Box textAlign="center" marginBottom="20px">
          <Typography variant="h4" color="textPrimary">
            {userCity}
          </Typography>
          <Typography variant="h5" color="textPrimary">
            {todayWeather.temperature}°C
          </Typography>
          <Typography variant="body1" color="textPrimary" display="flex" justifyContent="center" alignItems="center">
            {todayWeather.mainStatus.charAt(0).toUpperCase() + todayWeather.mainStatus.slice(1)}
            <img src={weatherIcons[todayWeather.mainStatus.toLowerCase()]} alt={todayWeather.mainStatus} style={{ marginLeft: '10px', width: '30px', height: '30px' }} />
          </Typography>
        </Box>
      )}
      <Typography variant="h2" gutterBottom align="center" color="textPrimary">
        Weather Data for {userCity} (Next 7 Days)
      </Typography>
      <Typography variant="body1" gutterBottom align="center" color="textPrimary">
        Welcome to the Home Page!
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom="10px">
        <Button component={Link} to="/" variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Login
        </Button>
        <Button component={Link} to="/profile" variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Profile
        </Button>
        <Button component={Link} to="/search" variant="contained" color="primary">
          Search Weather
        </Button>
      </Box>
      {isAdmin && (
        <Box display="flex" justifyContent="center" marginBottom="20px">
          <Button component={Link} to="/admin" variant="contained" color="secondary">
            Admin Panel
          </Button>
        </Box>
      )}
      <form onSubmit={handleCityChange}>
        <Box display="flex" justifyContent="center" alignItems="center" marginBottom="20px">
          <TextField
            label="New City"
            variant="outlined"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Change City
          </Button>
        </Box>
      </form>
      {weatherData.length > 0 && (
        <Box>
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
              {weatherData.map((data) => (
                <tr key={`${data.cityName}-${data.weatherDate}`}>
                  <td>{data.cityName}</td>
                  <td>{new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(data.weatherDate))}</td>
                  <td>{data.temperature}°C</td>
                  <td>
                    {data.mainStatus}
                    <img src={weatherIcons[data.mainStatus.toLowerCase()]} alt={data.mainStatus} style={{ marginLeft: '10px', width: '20px', height: '20px' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Box style={{ width: '100%', height: '400px', margin: '0 auto' }}>
            <Line data={chartData} options={chartOptions} />
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export default Home;
