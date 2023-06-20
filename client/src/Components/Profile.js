import React, { useContext, useState } from 'react';
import { UserContext } from '../context/AuthContext';
import ProfileForm from './ProfileForm';
import '../Styles/Profile.css';

const Profile = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  console.log(user.profile)

  if (!isLoggedIn) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Profile</h2>
          <p>Please login to view your profile.</p>
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
            <p>
              <label>Email:</label> {user.email}
            </p>
          </div>
          <hr />
          <br />
          <h2>Profile Details</h2>
        </div>
        <div className="profile-form-container">
          <ProfileForm setEditing={setEditing} />
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
            <p>
              <label>Email:</label> {user.email}
            </p>
          </div>
          <hr />
          <br />
          <h2>Profile Details</h2>
          <div className="profile-details">
            {user && user.profile.avatar && <img src={user.profile.avatar} alt="Avatar" />}
            {user && (
              <>
                <p>
                  <label>Name:</label>
                  <span>{user.profile.name}</span>
                </p>
                <p>
                  <label>Age:</label>
                  <span>{user.profile.age}</span>
                </p>
                <p>
                  <label>Bio:</label>
                  <span>{user.profile.bio}</span>
                </p>
                <p>
                  <label>Total Games Played:</label>
                  <span>{user.profile.total_games_played}</span>
                </p>
                <p>
                  <label>Favorite Genre:</label>
                  <span>{user.profile.favorite_genre}</span>
                </p>
                <p>
                  <label>Hours Played:</label>
                  <span>{user.profile.hours_played}</span>
                </p>
              </>
            )}
          </div>

          <button onClick={() => setEditing(true)}>Edit Profile</button>
          <hr />
        </div>
      </div>
    );
  }
};

export default Profile;
