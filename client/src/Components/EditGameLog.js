import React, { useState, useContext } from 'react'
import { UserContext } from '../context/AuthContext'

const EditGameLog = ({ gameLog, onCancel, onSave }) => {
  const [status, setStatus] = useState(gameLog.status);
  const [rating, setRating] = useState(gameLog.rating);
  const [dateStarted, setDateStarted] = useState(gameLog.date_started);
  const [dateStopped, setDateStopped] = useState(gameLog.date_stopped);
  const [dateCompleted, setDateCompleted] = useState(gameLog.date_completed);
  const [playTime, setPlayTime] = useState(gameLog.play_time);
  const { errors } = useContext(UserContext);

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
          type="date"
          value={dateStarted}
          onChange={(e) => setDateStarted(e.target.value)}
        />
      </td>
      <td>
        <input
          type="date"
          value={dateStopped}
          onChange={(e) => setDateStopped(e.target.value)}
        />
      </td>
      <td>
        <input
          type="date"
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


//---------- 2nd attempt at rendering fields based on status ----------//

//   const displayErrors = () => {
//     return errors.map((error) => <p style={{ color: 'red' }} key={error}>{error}</p>);
//   };

//   const renderFields = () => {
//     if (status === 'In Progress') {
//       return (
//         <>
//         <div className="mb-3">
//           <label htmlFor="rating" className="form-label">
//             My Rating
//           </label>
//           <select
//             className="form-select"
//             id="rating"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//           >
//             <option value="--">--</option> 
//             <option value="1">1 - Low</option>
//             <option value="2">2 - Below Average</option>
//             <option value="3">3 - Average</option>
//             <option value="4">4 - Above Average</option>
//             <option value="5">5 - High</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="play_time" className="form-label">
//             Hours Played
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             id="play_time"
//             value={playTime}
//             onChange={(e) => setPlayTime(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="date_started" className="form-label">
//             Start
//           </label>
//           <input
//             type="date"
//             className="form-control"
//             id="date_started"
//             value={dateStarted}
//             onChange={(e) => setDateStarted(e.target.value)}
//           />
//         </div>
//         </>
//       );
//     } else if (status === 'Abandoned') {
//       return (
//         <>
//         <div className="mb-3">
//           <label htmlFor="rating" className="form-label">
//             My Rating
//           </label>
//           <select
//             className="form-select"
//             id="rating"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//           >
//             <option value="--">--</option> 
//             <option value="1">1 - Low</option>
//             <option value="2">2 - Below Average</option>
//             <option value="3">3 - Average</option>
//             <option value="4">4 - Above Average</option>
//             <option value="5">5 - High</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="play_time" className="form-label">
//             Hours Played
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             id="play_time"
//             value={playTime}
//             onChange={(e) => setPlayTime(e.target.value)}
//           />
//         </div>
//           <div className="mb-3">
//             <label htmlFor="date_started" className="form-label">
//               Start
//             </label>
//             <input
//               type="date"
//               className="form-control"
//               id="date_started"
//               value={dateStarted}
//               onChange={(e) => setDateStarted(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="date_stopped" className="form-label">
//               Stopped
//             </label>
//             <input
//               type="date"
//               className="form-control"
//               id="date_stopped"
//               value={dateStopped}
//               onChange={(e) => setDateStopped(e.target.value)}
//             />
//           </div>
//         </>
//       );
//     } else if (status === 'Complete') {
//       return (
//         <>
//         <div className="mb-3">
//           <label htmlFor="rating" className="form-label">
//             My Rating
//           </label>
//           <select
//             className="form-select"
//             id="rating"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//           >
//             <option value="--">--</option> 
//             <option value="1">1 - Low</option>
//             <option value="2">2 - Below Average</option>
//             <option value="3">3 - Average</option>
//             <option value="4">4 - Above Average</option>
//             <option value="5">5 - High</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="play_time" className="form-label">
//             Hours Played
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             id="play_time"
//             value={playTime}
//             onChange={(e) => setPlayTime(e.target.value)}
//           />
//         </div>
//           <div className="mb-3">
//             <label htmlFor="date_started" className="form-label">
//               Start
//             </label>
//             <input
//               type="date"
//               className="form-control"
//               id="date_started"
//               value={dateStarted}
//               onChange={(e) => setDateStarted(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="date_completed" className="form-label">
//               Completed
//             </label>
//             <input
//               type="date"
//               className="form-control"
//               id="date_completed"
//               value={dateCompleted}
//               onChange={(e) => setDateCompleted(e.target.value)}
//             />
//           </div>
//         </>
//       );
//     } else if (status === 'Wishlist') {
//       return (
//         <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//       )
//     }
//     return null;
//   };

//   return (
//     <div>
//       <form onSubmit={handleSave}>
//         {displayErrors()}
//         <div className="mb-3">
//           <label htmlFor="status" className="form-label">
//             Status
//           </label>
//           <select
//             className="form-select"
//             id="status"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="Not Played">Not Played</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Abandoned">Abandoned</option>
//             <option value="Complete">Complete</option>
//             <option value="Wishlist">Wishlist</option>
//           </select>
//         </div>
        
//         {renderFields()}
//         {status !== 'Wishlist' && (
//           <div>
//             <button onClick={handleSave}>Save</button>
//             <button onClick={onCancel}>Cancel</button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };
          
          
// export default EditGameLog