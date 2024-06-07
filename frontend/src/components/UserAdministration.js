import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { getUsersAUTH, createUserAUTH, updateUserAUTH, deleteUserAUTH } from '../services/api';
import { Typography } from '@mui/material';
import Layout from '../components/Layout';

const UserAdministration = () => {
  const { authTokens } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    userType: '',
    defaultCityName: '',
    status: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsersAUTH();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchData();
  }, []);

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
      await updateUserAUTH(formData.username, formData, authTokens);
    } else {
      await createUserAUTH(formData);
    }

    const data = await getUsersAUTH();
    setUsers(data);
    setFormData({
      username: '',
      password: '',
      name: '',
      userType: '',
      defaultCityName: '',
      status: '',
    });
    setIsEditing(false);
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  const handleDelete = async (username) => {
    await deleteUserAUTH(username, authTokens);
    const data = await getUsersAUTH();
    setUsers(data);
  };

  return (

    <Layout>
      <Typography variant="h2" gutterBottom align="center" color="textPrimary">
        Profile Page
      </Typography>
      <Typography variant="body1" gutterBottom align="center" color="textPrimary">
      <h2>User Administration</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            disabled={isEditing} // Prevent editing username during update
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>User Type</label>
          <input
            type="text"
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Default City Name</label>
          <input
            type="text"
            name="defaultCityName"
            value={formData.defaultCityName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
      </form>
      </Typography>
      <div>
      <h3>Existing Users</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>User Type</th>
            <th>Default City Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.userType}</td>
              <td>{user.defaultCityName}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </Layout>

      );
};

export default UserAdministration;
