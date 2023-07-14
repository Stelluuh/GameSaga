import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import GameLogForm from './GameLogForm';

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

const GameDetails = () => {
  const { isLoggedIn, user } = useContext(UserContext);
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [editing, setEditing] = useState(false);


  //using params to grab the all games and finding the particular game.

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`/games/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setGame(data);

        });
    }
  }, [isLoggedIn, id, user]);

  if (!isLoggedIn) {
    return (
      <div className="container text-center">
        <h3>Please Login or Signup</h3>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container text-center">
        <h3>Loading game details...</h3>
      </div>
    );
  }



  // -------------------------------CAROUSEL FROM BOOTSTRAP ---------------------------------
  const screenshots = JSON.parse(game.screenshots); 

  if(!isLoggedIn) {
    return (
      <div className="container text-center">
        <h3>Please Login or Signup</h3>
      </div>
    );
  } else if (editing) {
    //do something
  } else {
  return (
    <div className="container">
      <div className="row justify-content-center mt-4">
        
        <h3>{game.name}</h3>
        <div className="col-md-8">
          {screenshots.length > 0 && ( // if there are screenshots, render the carousel
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
          

          {/* ----------------------------- GAME DETAILS ----------------------------- */}
          
          <h4>Rating: {game.aggregated_rating}/100</h4>
          <br />
          <h4>Platform: {game.platforms}</h4>
          <br />
          <h4>Genre: {game.genre.name}</h4>
          <br />
          <h4>Release Date: {formatDate(game.release_date)}</h4>
          <br />
          <h4>Description: {game.summary}</h4>
          <br />
          <h4>Involved Company: {game.involved_company}</h4>
          <br />
          {/* if user has game in library, render "Added to Library" else render GameLogForm */}
          {user.games.map((gameObj) => gameObj.id).includes(game.id) ? (<h3 style={{ color: 'blue' }} >Added to Library</h3>) : (<GameLogForm game={game} />)}
          <br />
          </div>
      </div>
    </div>
  )};
};

export default GameDetails;
