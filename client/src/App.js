// client/src/components/App.js
// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from './context/AuthContext'
import Home from './Components/Home'
import NavBar from "./Components/NavBar";
import Signup from './Components/Signup'
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import CreateProfile from "./Components/CreateProfile";
import BrowseGames from "./Components/BrowseGames";
import GameDetails from "./Components/GameDetails";
import MyGames from "./Components/MyGames";
import './Styles/App.css'


function App() {

  return (
      <div className="App">
        <UserProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profiles/:username" element={<Profile />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/games" element={<BrowseGames />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/my_games" element={<MyGames />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </UserProvider>
      </div>
  );
}

export default App;