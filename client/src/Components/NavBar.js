import React, { useContext } from 'react';
import { UserContext } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css';

const NavBar = () => {
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/logout');
  };

  return (
    <nav className="navbar">
      <NavLink exact to="/" className="navbar-link">
        <button className="navbar-button">Home</button>
      </NavLink>
      {isLoggedIn ? (
        <button className="navbar-button" onClick={handleLogout}>
          Logout
        </button>
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
