import React, { useState, useContext } from 'react';
import { UserContext } from '../context/AuthContext';

const GameLogForm = ({ game }) => {
  const [status, setStatus] = useState('Not Played');
  const [rating, setRating] = useState(0);
  const [dateStarted, setDateStarted] = useState('');
  const [dateStopped, setDateStopped] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');
  const [playTime, setPlayTime] = useState(0);

  const { addGameLog, errors } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const gameLog = {
      game_id: game.id,
      status,
      rating,
      dateStarted,
      dateStopped,
      dateCompleted,
      playTime
    };
    addGameLog(gameLog);
  };

  const displayErrors = () => {
    return errors.map((error) => <p style={{ color: 'red' }} key={error}>{error}</p>);
  };

  const renderFields = () => {
    if (status === 'In Progress') {
      return (
        <>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            My Rating
          </label>
          <select
            className="form-select"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="--">--</option> 
            <option value="1">1 - Low</option>
            <option value="2">2 - Below Average</option>
            <option value="3">3 - Average</option>
            <option value="4">4 - Above Average</option>
            <option value="5">5 - High</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="playTime" className="form-label">
            Hours Played
          </label>
          <input
            type="number"
            className="form-control"
            id="playTime"
            value={playTime}
            onChange={(e) => setPlayTime(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateStarted" className="form-label">
            Start
          </label>
          <input
            type="date"
            className="form-control"
            id="dateStarted"
            value={dateStarted}
            onChange={(e) => setDateStarted(e.target.value)}
          />
        </div>
        </>
      );
    } else if (status === 'Abandoned') {
      return (
        <>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            My Rating
          </label>
          <select
            className="form-select"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="--">--</option> 
            <option value="1">1 - Low</option>
            <option value="2">2 - Below Average</option>
            <option value="3">3 - Average</option>
            <option value="4">4 - Above Average</option>
            <option value="5">5 - High</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="playTime" className="form-label">
            Hours Played
          </label>
          <input
            type="number"
            className="form-control"
            id="playTime"
            value={playTime}
            onChange={(e) => setPlayTime(e.target.value)}
          />
        </div>
          <div className="mb-3">
            <label htmlFor="dateStarted" className="form-label">
              Start
            </label>
            <input
              type="date"
              className="form-control"
              id="dateStarted"
              value={dateStarted}
              onChange={(e) => setDateStarted(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dateStopped" className="form-label">
              Stopped
            </label>
            <input
              type="date"
              className="form-control"
              id="dateStopped"
              value={dateStopped}
              onChange={(e) => setDateStopped(e.target.value)}
            />
          </div>
        </>
      );
    } else if (status === 'Complete') {
      return (
        <>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            My Rating
          </label>
          <select
            className="form-select"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="--">--</option> 
            <option value="1">1 - Low</option>
            <option value="2">2 - Below Average</option>
            <option value="3">3 - Average</option>
            <option value="4">4 - Above Average</option>
            <option value="5">5 - High</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="playTime" className="form-label">
            Hours Played
          </label>
          <input
            type="number"
            className="form-control"
            id="playTime"
            value={playTime}
            onChange={(e) => setPlayTime(e.target.value)}
          />
        </div>
          <div className="mb-3">
            <label htmlFor="dateStarted" className="form-label">
              Start
            </label>
            <input
              type="date"
              className="form-control"
              id="dateStarted"
              value={dateStarted}
              onChange={(e) => setDateStarted(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dateCompleted" className="form-label">
              Completed
            </label>
            <input
              type="date"
              className="form-control"
              id="dateCompleted"
              value={dateCompleted}
              onChange={(e) => setDateCompleted(e.target.value)}
            />
          </div>
        </>
      );
    } else if (status === 'Wishlist') {
      return (
        <button type="submit" className="btn btn-primary">
            Submit
          </button>
      )
    }
    return null;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {displayErrors()}
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Not Played">Not Played</option>
            <option value="In Progress">In Progress</option>
            <option value="Abandoned">Abandoned</option>
            <option value="Complete">Complete</option>
            <option value="Wishlist">Wishlist</option>
          </select>
        </div>
        
        {renderFields()}
        {status !== 'Wishlist' && (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default GameLogForm;


