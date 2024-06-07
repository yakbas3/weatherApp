import axios from 'axios';

const API_URL = 'http://localhost:5226/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach the token to requests
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).token : null;
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Login function
const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { username, password });
    const data = response.data;
    localStorage.setItem('authTokens', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

const getUsers = async (authTokens) => {
  const response = await axios.get(`${API_URL}/User`, {
    headers: {
      Authorization: `Bearer ${authTokens}`,
    },
  });
  return response.data;
};



const register = (email, password, otherData) => {
  return axios.post(`${API_URL}/auth/register`, { email, password, ...otherData });
};

const fetchProfile = (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// User API
const fetchUsers = () => axios.get(`${API_URL}/users`);
const createUser = (user) => axios.post(`${API_URL}/users`, user);
const updateUser = (id, user) => axios.put(`${API_URL}/users/${id}`, user);
const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);

// Weather Data API
const fetchWeatherData = () => axios.get(`${API_URL}/weather`);
const createWeatherData = (data) => axios.post(`${API_URL}/weather`, data);
const updateWeatherData = (id, data) => axios.put(`${API_URL}/weather/${id}`, data);
const deleteWeatherData = (id) => axios.delete(`${API_URL}/weather/${id}`);

// Add more API calls as needed

const getUsersAUTH = async () => {
  const response = await axios.get(`${API_URL}/Users`);
  return response.data;
};

const getUserAUTH = async (username) => {
  const response = await axios.get(`${API_URL}/Users/${username}`);
  return response.data;
};

const createUserAUTH = async (userData) => {
  const response = await axios.post(`${API_URL}/Users`, userData);
  return response.data;
};

const updateUserAUTH = async (username, userData, authTokens) => {
  const response = await axios.put(`${API_URL}/Users/${username}`, userData, {
    headers: {
      Authorization: `Bearer ${authTokens}`,
    },
  });
  return response.data;
};

const deleteUserAUTH = async (username, authTokens) => {
  const response = await axios.delete(`${API_URL}/Users/${username}`, {
    headers: {
      Authorization: `Bearer ${authTokens}`,
    },
  });
  return response.data;
};

const getWeatherDataByCityAndDate = async (city, date) => {
  const response = await axios.get(`${API_URL}/WeatherInfo/${city}/${date}`);
  return response.data;
};

const getWeatherDataByCity = async (city) => {
  const response = await axios.get(`${API_URL}/WeatherInfo/${city}`);
  return response.data;
};

const getWeatherDataByCityForWeek = async (city) => {
  const response = await axios.get(`${API_URL}/WeatherInfo/${encodeURIComponent(city)}/week`);
  return response.data;
};

const getTodayWeather = async (city) => {
  const response = await axios.get(`${API_URL}/WeatherInfo/${encodeURIComponent(city)}/today`);
  return response.data;
};

const getUserWeatherData = async (username) => {
  const response = await axios.get(`${API_URL}/UserWeatherInfo/${username}/weather`);
  return response.data;
};

const getUserLogs = async (authTokens) => {
  const response = await axios.get(`${API_URL}/UserLogs`, {
    headers: {
      Authorization: `Bearer ${authTokens}`,
    },
  });
  return response.data;
};

const updateUserCity = async (cityName, authTokens) => {
  const response = await axios.put(`${API_URL}/Users/update-city`, { cityName }, {
    headers: {
      Authorization: `Bearer ${authTokens}`,
    },
  });
  return response.data;
};

export { 
  login, 
  register, 
  fetchProfile, 
  fetchUsers, 
  createUser, 
  updateUser,
  deleteUser,
  fetchWeatherData,
  createWeatherData, 
  updateWeatherData,
  deleteWeatherData,
  getUsers,
  getUsersAUTH,
  createUserAUTH,
  updateUserAUTH,
  deleteUserAUTH,
  getUserAUTH,
  getWeatherDataByCityAndDate,
  getWeatherDataByCity,
  getWeatherDataByCityForWeek,
  getTodayWeather,
  getUserWeatherData,
  getUserLogs,
  updateUserCity
 };
