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
      date_started: status === 'In Progress' || status === 'Complete' || status === 'Abandoned' ? dateStarted : null,
      date_stopped: status === 'Abandoned' ? dateStopped : null,
      date_completed: status === 'Complete' ? dateCompleted : null,
      play_time: playTime,
    }
    onSave(editedLog)
    
  };

  const renderStartDateInput = () => {
    if ( status === 'Wishlist' || status === 'Not Played') {
      return null
    } else {
      return(
      <input
        type="date"
        value={dateStarted}
        onChange={(e) => setDateStarted(e.target.value)}
      />
      )
    } 
  }

  const renderDateStoppedInput = () => {
    if (status === 'Complete' || status === 'Wishlist' || status === 'Not Played' || status === 'In Progress') {
      return null
    } else {
      return (
        <input
        type="date"
        value={dateStopped}
        onChange={(e) => setDateStopped(e.target.value)}
      />
      )
    }
  }

  const renderCompleteDateInput = () => {
    if (status === 'Abandoned' || status === 'Wishlist' || status === 'Not Played' || status === 'In Progress') {
      return null
    } else {
      return(
        <input
          type="date"
          value={dateCompleted}
          onChange={(e) => setDateCompleted(e.target.value)}
        />
      )
    }
  }

//---------- 1st attempt at rendering fields based on status ----------//


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
          <option value="--">--</option> 
          <option value="1">1 - Low</option>
          <option value="2">2 - Below Average</option>
          <option value="3">3 - Average</option>
          <option value="4">4 - Above Average</option>
          <option value="5">5 - High</option>
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
        {renderStartDateInput()}
      </td>
      <td>
        {renderDateStoppedInput()}
      </td>
      <td>
          {renderCompleteDateInput()}
      </td>
      <td>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </td>
      
    </>
  );
};
          
          
export default EditGameLog

