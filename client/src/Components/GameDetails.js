import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

const GameDetails = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`/games/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setGame(data);
          console.log(data);
        });
    }
  }, [isLoggedIn, id]);

  if (!isLoggedIn) {
    return (
      <div className="container">
        <h3>Please Login or Signup</h3>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container">
        <h3>Loading game details...</h3>
      </div>
    );
  }

  const screenshots = JSON.parse(game.screenshots);

  return (
    <div className="container">
      <h3 className="mt-4">Game Details</h3>
      <div className="row mt-4">
        <div className="col-md-4">
          <img src={game.cover} alt="Cover"  />
        </div>
        <div className="col-md-8">
          <h4>{game.name}</h4>
          <h4>Rating: {game.aggregated_rating}/100</h4>
          <h4>Platform: {game.platform}</h4>
          <h4>Genre: {game.genre.name}</h4>
          <h4>Release Date: {formatDate(game.release_date)}</h4>
          <h4>Description: {game.summary}</h4>
          <h4>Involved Company: {game.involved_company}</h4>
          {screenshots.length > 0 && (
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {screenshots.map((screenshot, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <img src={screenshot} className="d-block w-100" alt={`Screenshot ${index + 1}`} />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
