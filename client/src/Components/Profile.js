import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/AuthContext'
import EditProfile from './EditProfile'
import PieChart from './PieChart'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import '../Styles/Profile.css'

Chart.register(CategoryScale)

const Profile = () => {
  const { user, isLoggedIn, deleteAccount } = useContext(UserContext)
  const [editing, setEditing] = useState(false)
  const [chartData, setChartData] = useState(null)
  
  useEffect(() => {
    if (user && user.games) {
      const games = user.games;
      const genres = games.map(game => game.genre);
      // uniqueGenres is an array of unique genres. It's used to create the chart labels.
      const uniqueGenres = [...new Set(genres)]; //refactored from https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
      // ...new Set(genres) is used to remove duplicate genres from the genres array.
      const chartData = {
        labels: [],
        datasets: [{ data: [], backgroundColor: [], borderColor: [] }]
      };
  
      games.forEach(game => {
        const genre = game.genre.name;
  
        // Check if the genre already exists in the chart data
        const existingGenreIndex = chartData.labels.indexOf(genre);
        if (existingGenreIndex !== -1) { // -1 means it doesn't exist
          // Update the existing data value for the genre
          chartData.datasets[0].data[existingGenreIndex]++;
        } else {
          // Add a new genre to the chart data
          chartData.labels.push(genre);
          chartData.datasets[0].data.push(1);
          chartData.datasets[0].backgroundColor.push(getRandomColor());
          chartData.datasets[0].borderColor.push(getRandomColor());
        }
      });
  
      setChartData(chartData);
    }
  }, [user]);
  
  // Function to generate a random color
  // Refactored from https://stackoverflow.com/questions/1484506/random-color-generator
  function getRandomColor() {
    // Math.random() = random number between 0 and 1
    const randomColor = Math.floor(Math.random() * 16777215).toString(16); //16777215 is the decimal value of the highest hex color value (FFFFFF)
    return "#" + randomColor;
    console.log(randomColor)
  }
  

  if (!isLoggedIn) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h3>Please login to view your profile.</h3>
        </div>
      </div>
    )
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
            <p>
              <label>Email:</label> {user.email}
            </p>
          </div>
          <button onClick={() => deleteAccount()}>Delete Account</button>
          <hr />
          <br />
          <h2>Profile Details</h2>
          <div className="profile-details">
            {user && user.profile?.avatar && <img src={user.profile?.avatar} alt="Avatar" />}
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
                  <span>{user.profile?.total_games_played}</span>
                </p>
                <p>
                  <label>Favorite Genre:</label>
                  <span>{user.profile?.favorite_genre}</span>
                </p>
                <p>
                  <label>Hours Played:</label>
                  <span>{user.profile?.hours_played}</span>
                </p>
              </>
            )}
          </div>
          
          <button onClick={() => setEditing(true)}>Edit Profile</button>
          <hr />
          {chartData && <PieChart chartData={chartData} />}
        </div>
      </div>
    );
  }
};

export default Profile;
