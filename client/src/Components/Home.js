import React from 'react';
import '../Styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to GameSaga</h1>
      <p className="home-description">
        Manage your gaming activities, explore new games, and track your progress with GameSaga.
      </p>
      <button className="home-action-button">Get Started</button>
      <p className="home-subtext">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default Home;
