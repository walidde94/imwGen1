import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div>
        <nav style={styles.navbar}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link to="/" style={styles.navLink}>Home</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/about" style={styles.navLink}>About Me</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/login" style={styles.navLink}>Login</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/register" style={styles.navLink}>Register</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
    color: '#fff',
    textAlign: 'center',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  navItem: {
    display: 'inline',
    margin: '0 20px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  }
};

export default App;
