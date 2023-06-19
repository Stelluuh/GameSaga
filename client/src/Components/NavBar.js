import React, { useContext } from 'react';
import { UserContext } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css';

const NavBar = () => {
  const { isLoggedIn, logout, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    fetch('/logout', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        // console.log('logged out')
        logout()
        navigate('/')
      })
  };

  return (
    <nav className="navbar">
      <NavLink exact to="/" className="navbar-link">
        <button className="navbar-button">Home</button>
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to={`/profiles/${user.username}`} className="navbar-link">
            <button className="navbar-button">My Profile</button>
          </NavLink>
          <button className="navbar-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className="navbar-link">
            <button className="navbar-button">Login</button>
          </NavLink>
          <NavLink to="/signup" className="navbar-link">
            <button className="navbar-button">Signup</button>
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default NavBar;