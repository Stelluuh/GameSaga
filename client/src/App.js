// client/src/components/App.js
// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from './context/AuthContext'
import Home from './Components/Home'
import Signup from './Components/Signup'


function App() {

  return (
      <div className="App">
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </UserProvider>
      </div>
  );
}

export default App;