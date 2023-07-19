import React, { useContext } from 'react';
import { UserContext } from '../context/AuthContext';
import '../Styles/Home.css';

const Home = () => {
  const { user, isLoggedIn } = useContext(UserContext);

  if(isLoggedIn){
  return (
    <div className="home-container">
      <h1 className="home-title">Hello, {user.username}. Welcome to GameSaga</h1>
      <p className="home-description">
        Manage your gaming activities, explore new games, and track your progress with GameSaga.
      </p>
    </div>
  )
  } else {  // if user is not logged in
    return (
      <div className="home-container">
        <h1 className="home-title">Welcome to GameSaga</h1>
        <p className="home-description">
          Manage your gaming activities, explore new games, and track your progress with GameSaga.
        </p>
        <p className="home-subtext">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    )
  };
};

export default Home;
