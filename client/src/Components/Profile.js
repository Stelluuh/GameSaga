import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/AuthContext';
import EditProfile from './EditProfile';
import '../Styles/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({})
  const [editing, setEditing] = useState(false)
  const { user, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    fetch(`/profiles/${user.id}`)
      .then(response => response.json())
      .then(userProfile => {
        setProfile(userProfile)
        console.log(userProfile)
      });
  }, [user.id]);


  if (!isLoggedIn) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Profile</h2>
          <p>Please login to view your profile.</p>
        </div>
      </div>
    );
  } else if (editing) { //if logged in and editing is true
    return (
      <div className="profile-container">
        <EditProfile profile={profile} setProfile={setProfile} setEditing={setEditing} />
      </div>
    );

  } else { // if logged in and not editing:
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Account Details</h2>
          <div className="account-details">
            <p><label>Username:</label> {user.username}</p>
            <p><label>Email:</label> {user.email}</p>
          </div>
          <hr />
          <br />
          <h2>Profile Details</h2>
          <div className="profile-details">
            {profile && profile.avatar && <img src={profile.avatar} alt="Avatar" />}
            <p><label>Name:</label>{profile && profile.name && <span> {profile.name}</span>}</p>
            <p><label>Age:</label>{profile && profile.age && <span> {profile.age}</span>}</p>
            <p><label>Bio:</label>{profile && profile.bio && <span> {profile.bio}</span>}</p>
            <p><label>Total Games Played:</label>{profile && profile.total_games_played && <span> {profile.total_games_played}</span>}</p>
            <p><label>Favorite Genre:</label>{profile && profile.favorite_genre && <span> {profile.favorite_genre}</span>}</p>
            <p><label>Hours Played:</label>{profile && profile.hours_played && <span> {profile.hours_played}</span>}</p>
          </div>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
          <hr />
        </div>
      </div>
    );
  }
};

export default Profile;
