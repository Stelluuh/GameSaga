import React, { useState, useContext } from 'react';
import { UserContext } from '../context/AuthContext';
import EditGameLog from './EditGameLog';

const MyGameCard = ({ game }) => {
  const { name, genre } = game;
  const [logErrors, setLogErrors] = useState([])
  const [editingLogId, setEditingLogId] = useState(null);
  
  const { deleteGameLog, setUser, user } = useContext(UserContext);

  const editGameLog = (editedLog) => {
    fetch(`/game_logs/${editedLog.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(editedLog),
    })
        .then(response => response.json())
        .then(updatedLog => {
            if(updatedLog.errors) {
                setLogErrors(updatedLog.errors)
            } else
            setLogErrors([])
            setUser({ ...user, 
              game_logs: user.game_logs.map(gameLog => 
                gameLog.id === updatedLog.id ? updatedLog : gameLog
                ), 
              games: user.games.map(game => 
                game.id === updatedLog.game_id ? updatedLog.game : game
                )
            })
        })
}
  
  const handleDeleteGameLog = (gameLogId) => {
    deleteGameLog(gameLogId);
  };

  const handleEditGameLog = (gameLogId) => {
    setEditingLogId(gameLogId);
  };

  const handleCancelEdit = () => {
    setEditingLogId(null);
  };

  const handleSaveGameLog = (editedLog) => {

    editGameLog(editedLog);
    setEditingLogId(null);

  };

  
  
  const gameLogs = user.game_logs?.filter((log) => log.game_id === game.id);
  
  
  const displayErrors = () => {
    return logErrors.map((error) => < tr style={{color: 'red'}}key={error}>{error}</tr>);
  }


  return (
    <div className="card bg-dark text-light mb-3">
      <div className="card-body">
        <h5 className="card-title text-primary">{name}</h5>
        <p className="card-text">Genre: <span className="font-weight-bold">{genre.name}</span></p>
        <div>
          <p className="font-italic">Game Log:</p>
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Status</th>
                <th>Rating</th>
                <th>Hours Played</th>
                <th>Date Start</th>
                <th>Date Stopped</th>
                <th>Date Completed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {gameLogs?.map((log) => (
                <tr key={log.id}>
                  {editingLogId === log.id ? (
                    <EditGameLog
                      gameLog={log}
                      onCancel={handleCancelEdit}
                      onSave={handleSaveGameLog}
                    />
                  ) : (
                    <>
                      <td>{log.status}</td>
                      <td>{log.rating}</td>
                      <td>{log.play_time}</td>
                      <td>{log.date_started}</td>
                      <td>{log.date_stopped}</td>
                      <td>{log.date_completed}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDeleteGameLog(log.id)}>Delete</button>
                        <button className="btn btn-primary" onClick={() => handleEditGameLog(log.id)}>Edit</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {displayErrors()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyGameCard;



