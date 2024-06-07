import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../auth/AuthContext';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
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
import { Typography, Button, Box } from '@mui/material';
import Layout from '../components/Layout';

const weatherImages = {
  Clear: sunnyImage,
  Clouds: cloudyImage,
  Rain: rainyImage,
  Fog: foggyImage,
  Snow: snowyImage,
};

const weatherIcons = {
  Clear: sunnyIcon,
  Clouds: cloudyIcon,
  Rain: rainyIcon,
  Fog: foggyIcon,
  Snow: snowyIcon,
};

const NewHome = () => {
  const { authTokens } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [todayWeather, setTodayWeather] = useState(null);
  const [userCity, setUserCity] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

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
          const apiKey = 'a733c3a7786338534d1008c3e3bee28c';
          const todayResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=${apiKey}`);
          const todayData = await todayResponse.json();

          const weekResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&units=metric&appid=${apiKey}`);
          const weekData = await weekResponse.json();

          console.log('Today Data:', todayData);
          console.log('Week Data:', weekData);

          const weekWeatherData = weekData.list ? weekData.list.filter((reading) => reading.dt_txt.includes("12:00:00")) : [];

          setTodayWeather({
            temperature: todayData.main ? todayData.main.temp : null,
            mainStatus: todayData.weather ? todayData.weather[0].main : null,
          });
          setWeatherData(weekWeatherData.map(reading => ({
            cityName: userCity,
            weatherDate: reading.dt_txt,
            temperature: reading.main.temp,
            mainStatus: reading.weather[0].main,
          })));
          if (todayData.weather && todayData.weather[0].main) {
            setBackgroundImage(weatherImages[todayData.weather[0].main]);
          }
        } catch (error) {
          console.error('Error fetching weather data', error);
        }
      }
    };
    fetchWeatherData();
  }, [userCity]);

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
            {todayWeather.mainStatus}
            {todayWeather.mainStatus && (
              <img
                src={weatherIcons[todayWeather.mainStatus]}
                alt={todayWeather.mainStatus}
                style={{ marginLeft: '10px', width: '30px', height: '30px' }}
              />
            )}
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
                    {data.mainStatus && (
                      <img
                        src={weatherIcons[data.mainStatus]}
                        alt={data.mainStatus}
                        style={{ marginLeft: '10px', width: '20px', height: '20px' }}
                      />
                    )}
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

export default NewHome;
