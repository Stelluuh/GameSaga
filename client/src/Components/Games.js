import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/AuthContext';
import { FixedSizeList as List } from 'react-window';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Games.css';

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

const GameTableRow = ({ game, style }) => {
  return (
    <div className="row align-items-center" style={style}>
      <div className="col">
        <img src={game.cover} alt="cover" className="img-fluid" />
      </div>
      <div className="col">{game.name}</div>
      <div className="col">{game.genre.name}</div>
      <div className="col">{game.platform}</div>
      <div className="col">{formatDate(game.release_date)}</div>
      <div className="col">{game.involved_company}</div>
      <div className="col">{game.aggregated_rating}</div>
    </div>
  );
};

const Games = () => {
  const { isLoggedIn, games } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating API fetch delay with useEffect
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 6000); // Adjust the delay time as needed
  }, []);

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

  return (
    <div>
      <div className="container" style={{ height: '100vh' }}>
        <div className="row font-weight-bold text-light bg-dark justify-content-between">
          <div className="col">Cover</div>
          <div className="col">Name</div>
          <div className="col">Genre</div>
          <div className="col">Platform</div>
          <div className="col">Release Date</div>
          <div className="col">Developer</div>
          <div className="col">Aggregated Rating</div>
        </div>
        <List
          height={window.innerHeight - 56} // Subtract the height of the header row (adjust the value if needed)
          itemCount={games.length}
          itemSize={100}
          width="100%"
        >
          {({ index, style }) => (
            <GameTableRow key={games[index].id} game={games[index]} style={style} />
          )}
        </List>
      </div>
    </div>
  );
};

export default Games;
