import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/AuthContext'


//Set up a Profile component that will display the user's information.
//The profile belongs to the user that is currently logged in.
//The profile should display the user's username, email, and id.
 

//Remember to update the Profile component to handle the profile ID passed as a parameter and retrieve the corresponding profile information based on that ID.
//The profile should display all attributes of profile that belong to the user.
    // add a fetch request to the useEffect hook to get the user's profile
    // add a useState hook to store the user's profile
    // add a conditional to the return statement to display the user's profile

const Profile = () => {
  const [profile, setProfile] = useState({});
  const { user, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    fetch(`/profiles/${user.id}`)
      .then(response => response.json())
      .then(userProfile => {
        setProfile(userProfile)
        console.log(userProfile)
      })
  }, [])

  const handleEditProfile = () => {
    console.log('edit profile')
  
  }

  if(isLoggedIn) {
  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p> {profile.name}</p>
      <p> {profile.age}</p>
      <p> {profile.avatar}</p>
      <p> {profile.bio}</p>
      <p> {profile.total_games_played}</p>
      <p> {profile.favorite_genre}</p>
      <p> {profile.hours_played}</p>
      <button onClick={handleEditProfile}>Edit Profile</button>
    </div>
  )} else {
    return (
      <div>
        <h2>Profile</h2>
        <p>Please login to view your profile.</p>
      </div>
    )
  }
}

export default Profile
