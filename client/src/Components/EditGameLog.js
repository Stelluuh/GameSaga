import React, { useState, useContext } from 'react'
import { UserContext } from '../context/AuthContext'

const EditGameLog = ({ gameLog, onCancel, onSave }) => {
  const [status, setStatus] = useState(gameLog.status);
  const [rating, setRating] = useState(gameLog.rating);
  const [dateStarted, setDateStarted] = useState(gameLog.date_started);
  const [dateStopped, setDateStopped] = useState(gameLog.date_stopped);
  const [dateCompleted, setDateCompleted] = useState(gameLog.date_completed);
  const [playTime, setPlayTime] = useState(gameLog.play_time);

  const handleSave = () => {
    const editedLog = {
      ...gameLog,
      status,
      rating,
      date_started: dateStarted,
      date_stopped: dateStopped,
      date_completed: dateCompleted,
      play_time: playTime,
    }
    onSave(editedLog)
  };


  return (
    <>
      <td>
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
      </td>
      <td>
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
      </td>
      <td>
      <input
        type="text"
        value={playTime}
        onChange={(e) => setPlayTime(e.target.value)}
      />
      </td>
      <td>
        <input
          type="text"
          value={dateStarted}
          onChange={(e) => setDateStarted(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={dateStopped}
          onChange={(e) => setDateStopped(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={dateCompleted}
          onChange={(e) => setDateCompleted(e.target.value)}
        />
      </td>
      <td>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </td>
    </>
  );
};
          
          
export default EditGameLog
