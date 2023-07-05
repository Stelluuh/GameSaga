import React, { useState, useContext } from 'react';
import { UserContext } from '../context/AuthContext';

const GameLogForm = ({ game }) => {
  const [status, setStatus] = useState('Not Played')
  const [rating, setRating] = useState(0)
  const [date_started, setDateStarted] = useState('')
  const [date_stopped, setDateStopped] = useState('')
  const [date_completed, setDateCompleted] = useState('')
  const [play_time, setPlayTime] = useState(0)
  // const [isSubmitted, setIsSubmitted] = useState(false)

  const { addGameLog } = useContext(UserContext);
  // console.log(game.id)

  const handleSubmit = (e) => {
    e.preventDefault();
    const gameLog = {
        game_id: game.id,
        status,
        rating,
        date_started,
        date_stopped,
        date_completed,
        play_time
    }
    addGameLog(gameLog)
    setStatus('Not Played')
    setRating('')
    setDateStarted('')
    setDateStopped('')
    setDateCompleted('')
    setPlayTime('')
  };

  return (
    <div>
      {/* {isSubmitted && (
        <div className="alert alert-success" role="alert">
          Form submitted successfully!
        </div>
      )} */}
      <form onSubmit={handleSubmit}>
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
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="date_started" className="form-label">
            Start
          </label>
          <input
            type="date"
            className="form-control"
            id="date_started"
            value={date_started}
            onChange={(e) => setDateStarted(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date_stopped" className="form-label">
            Stopped
          </label>
          <input
            type="date"
            className="form-control"
            id="date_stopped"
            value={date_stopped}
            onChange={(e) => setDateStopped(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date_completed" className="form-label">
            Completed
          </label>
          <input
            type="date"
            className="form-control"
            id="date_completed"
            value={date_completed}
            onChange={(e) => setDateCompleted(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="play_time" className="form-label">
            Hours Played
          </label>
          <input
            type="number"
            className="form-control"
            id="play_time"
            value={play_time}
            onChange={(e) => setPlayTime(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GameLogForm;
