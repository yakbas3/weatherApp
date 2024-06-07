import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import UserAdministration from './components/UserAdministration';
import WeatherDataAdministration from './components/WeatherDataAdministration';
import UserList from './components/UsersList';
import DisplayToken from './components/DisplayToken';
import PrivateRoute from './components/PrivateRoute';
import NotAuthorized from './components/NotAuthorized';
import SearchWeather from './components/SearchWeather';
import NewHome from './components/NewHome';

const App = () => {
  return (


    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/weather" element={<WeatherDataAdministration />} />
          <Route path="/admin/users" element={<UserAdministration />} />
        </Route>
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/home" element={<Home />} />
        <Route path="/token" element={<DisplayToken />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchWeather />} />
        <Route path="/newhome" element={<NewHome />} />

      </Routes>
    </Router>



    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/home" element={<Home />} />
    //     <PrivateRoute path="/profile" component={Profile} />
    //     <PrivateRoute path="/admin" roles={['Admin']} component={AdminPanel} />
    //     <Route path="/admin/users" element={<UserAdministration />} />
    //     <Route path="/admin/userlist" element={<UserList />} />
    //     <Route path="/admin/weather" element={<WeatherDataAdministration />} />
    //     <Route path="/" element={<Home />} />
    //     <Route path="/token" element={<TokenDisplayLogin />} />
    //   </Routes>
    // </Router>
  );
};

export default App;
