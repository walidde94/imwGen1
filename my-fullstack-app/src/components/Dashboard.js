import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    } else {
      // Fetch user data using the token
      axios
        .get('/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/login');
        });
    }
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
