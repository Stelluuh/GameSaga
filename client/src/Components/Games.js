// ----------------------- PAGINATION (PAGES) -----------------------

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Games.css';
import GameSearch from './GameSearch';
import GameDetails from './GameDetails';

// convert from Unix timestamp to MM/DD/YYYY
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

const Games = () => {
  const { isLoggedIn, games } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 100; 
  const totalPages = Math.ceil(games.length / gamesPerPage);
  const maxVisiblePages = 5; 
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); 
  }, []);

  useEffect(() => {
    if (totalPages <= maxVisiblePages) {
      setVisiblePages(Array.from({ length: totalPages }, (_, index) => index + 1));
    } else {
      const middlePage = Math.ceil(maxVisiblePages / 2);
      let startPage = currentPage - middlePage + 1;
      if (startPage < 1) {
        startPage = 1;
      } else if (startPage + maxVisiblePages > totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
      }
      setVisiblePages(Array.from({ length: maxVisiblePages }, (_, index) => startPage + index));
    }
  }, [currentPage, maxVisiblePages, totalPages]);

  if (!isLoggedIn) {
    return <h3>Please login to view your games.</h3>;
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Get current games per page
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  // Change page
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="container">
        <div className="row font-weight-bold text-light bg-dark justify-content-between">
          <div className="col">Cover</div>
          <div className="col">Name</div>
          <div className="col">Genre</div>
          <div className="col">Platform</div>
          <div className="col">Release Date</div>
          <div className="col">Developer</div>
          <div className="col">Aggregated Rating</div>
          <div className="col">View</div>
          <div className='col'>Status</div>
        </div>

        {currentGames.map((game) => {
          const gameLog = game.game_log;
          return (
            <div className="row align-items-center" key={game.id} onClick={() => console.log('clicked game detail', game.id)}>
              <div className="col">
                <img src={game.cover} alt="cover" className="img-fluid" />
              </div>
              <div className="col">{game.name}</div>
              <div className="col">{game.genre.name}</div>
              <div className="col">{game.platform}</div>
              <div className="col">{formatDate(game.release_date)}</div>
              <div className="col">{game.involved_company}</div>
              <div className="col">{game.aggregated_rating}</div>
              <Link to={`/games/${game.id}`} className="col">
                <p>View</p>
              </Link>
              <div className="col">{gameLog ? gameLog.status : ''}</div>
            </div>
          );
        })}

        {/* Choose Pages: From Bootstarp */}
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {visiblePages.map((page) => (
              <li
                className={`page-item ${currentPage === page ? 'active' : ''}`}
                key={page}
              >
                <button className="page-link" onClick={() => goToPage(page)}>
                  {page}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>

        <div className="text-center mt-3">
          <span>Total Pages: {totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default Games;
