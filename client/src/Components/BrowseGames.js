import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Games.css';
import SearchBar from './SearchBar';

// convert from Unix timestamp to MM/DD/YYYY
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

const BrowseGames = () => {
  const { isLoggedIn, allGames } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 100;
  const totalPages = Math.ceil(allGames.length / gamesPerPage);
  const maxVisiblePages = 5;
  const [visiblePages, setVisiblePages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); //// reset page to 1 when searching
  };

  const filteredGames = searchQuery
    ? allGames.filter((game) => game.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allGames;
    
    if (!isLoggedIn) {
      return <h3>Please login to view your games.</h3>;
    }

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <div className="container">
        <div className="row font-weight-bold text-light bg-dark justify-content-between">
          <div className="col">Cover</div>
          <div className="col">Name</div>
          <div className="col">Genre</div>
          <div className="col">Platform</div>
          <div className="col">Release Date</div>
          <div className="col">Developer</div>
          <div className="col">Aggregated Rating</div>
        </div>

        {currentGames.map((game) => (
          <div
            className="row align-items-center game-row"
            key={game.id}
            onClick={() => handleGameClick(game.id)}
          >
            <div className="col">
              <img src={game.cover} alt="cover" className="img-fluid" />
            </div>
            <div className="col">{game.name}</div>
            <div className="col">{game.genre.name}</div>
            <div className="col">{game.platforms}</div>
            <div className="col">{formatDate(game.release_date)}</div>
            <div className="col">{game.involved_company}</div>
            <div className="col">{game.aggregated_rating}</div>
          </div>
        ))}

        {/* Choose Pages: From Bootstrap */}
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
              <li className={`page-item ${currentPage === page ? 'active' : ''}`} key={page}>
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

export default BrowseGames;
