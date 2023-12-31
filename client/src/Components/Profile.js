import React, { useContext, useState } from 'react';
import { UserContext } from '../context/AuthContext';
import EditProfile from './EditProfile';
import PieChart from './PieChart';
import BarChart from './BarChart';
import '../Styles/Profile.css';
import '../Styles/Chart.css';

const Profile = () => {
  const { user, isLoggedIn, deleteAccount } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
//map through the users game_logs and return all play_time. 
//Then use reduce to iterate through the games array and add up the total hours played
const totalHoursPlayed = user?.game_logs?.map(log => log.play_time).reduce((acc, total) => acc + total, 0)

const totalGamesPlayed = user?.game_logs?.filter(log => log.status === 'Complete' || log.status === 'In Progress').length

  if (!isLoggedIn) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h3>Please login to view your profile.</h3>
        </div>
      </div>
    );
  } else if (editing) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Account Details</h2>
          <div className="account-details">
            <p>
              <label>Username:</label> {user.username}
            </p>

          </div>
          <hr />
          <br />
          <h2>Profile Details</h2>
        </div>
        <div className="profile-form-container">
          <EditProfile setEditing={setEditing} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Account Details</h2>
          <div className="account-details">
            <p>
              <label>Username:</label> {user.username}
            </p>

          </div>
          <hr />
          <br />
          <h2>Profile Details</h2>
          <div className="profile-details">
            {user && user.profile?.avatar && <img className='avatar' src={user.profile?.avatar} alt="Avatar" />}
            {user && (
              <>
                <p>
                  <label>Name:</label>
                  <span>{user.profile?.name}</span>
                </p>
                <p>
                  <label>Age:</label>
                  <span>{user.profile?.age}</span>
                </p>
                <p>
                  <label>Bio:</label>
                  <span>{user.profile?.bio}</span>
                </p>
                <p>
                  <label>Total Games Played:</label>
                  <span>{totalGamesPlayed}</span>
                </p>
                <p>
                  <label>Favorite Genre:</label>
                  <span>{user.profile?.favorite_genre}</span>
                </p>
                <p>
                  <label>Hours Played:</label>
                  <span>
                    {totalHoursPlayed}
                  </span>
                </p>
              </>
            )}
          </div>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
          <hr />
        </div>
        <div className="chart-container">
          {user && user.games && <PieChart games={user.games} />}
        </div>
        <div className="chart-container">
          {user && user.game_logs && <BarChart gameLogs={user.game_logs} />}
        </div>
        <br />
        <br />
        <br />
        <button className="delete-button" onClick={() => deleteAccount()}>Delete Account</button>

      </div>
    );
  }
};

export default Profile;
