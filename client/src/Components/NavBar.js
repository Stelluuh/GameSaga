import React, { useContext } from 'react';
import { UserContext } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';


const NavBar = () => {
  const { isLoggedIn, logout, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        logout()
        navigate('/')
      })
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-right">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${user.username}`}
                    className="nav-link"
                    activeClassName="active"
                  >
                    My Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/games"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Browse Games
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/my_games"
                    className="nav-link"
                    activeClassName="active"
                  >
                    My Games
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/signup"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
