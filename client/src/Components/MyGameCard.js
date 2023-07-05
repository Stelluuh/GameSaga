import React from 'react';

const MyGameCard = ({ game }) => {
  const { name, genre, game_logs } = game;

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={game.cover} alt="Cover" className="img-fluid" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Genre: {genre.name}</p>
            <div>
              <p>Game Logs:</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Rating</th>
                    <th>Hours Played</th>
                  </tr>
                </thead>
                <tbody>
                  {game_logs?.map((log) => (
                    <tr key={log.id}>
                      <td>{log.status}</td>
                      <td>{log.rating}</td>
                      <td>{log.play_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGameCard;
