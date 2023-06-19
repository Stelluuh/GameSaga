import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/AuthContext';
import EditProfile from './EditProfile';
import '../Styles/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const { user, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    fetch(`/profiles/${user.id}`)
      .then(response => response.json())
      .then(userProfile => {
        setProfile(userProfile);
      });
  }, [user.id]);

  const handleEditProfile = () => {
    // console.log('edit profile');
  };

  if (isLoggedIn) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>{user.username}'s Profile</h2>
          <div className="profile-details">
            <p><label>Username:</label> {user.username}</p>
            <p><label>Email:</label> {user.email}</p>
            {profile && profile.name && <p><label>Name:</label> {profile.name}</p>}
            {profile && profile.age && <p><label>Age:</label> {profile.age}</p>}
            {profile && profile.avatar && <p><label>Avatar:</label> {profile.avatar}</p>}
            {profile && profile.bio && <p><label>Bio:</label> {profile.bio}</p>}
            {profile && profile.total_games_played && <p><label>Total Games Played:</label> {profile.total_games_played}</p>}
            {profile && profile.favorite_genre && <p><label>Favorite Genre:</label> {profile.favorite_genre}</p>}
            {profile && profile.hours_played && <p><label>Hours Played:</label> {profile.hours_played}</p>}
          </div>
          <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Profile</h2>
          <p>Please login to view your profile.</p>
        </div>
      </div>
    );
  }
};

export default Profile;
