// client/src/components/App.js
// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from './context/AuthContext'
import Home from './Components/Home'

function App() {
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   fetch("/hello")
  //     .then((r) => r.json())
  //     .then((data) => setCount(data.count));
  // }, []);

  return (
      <div className="App">
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </UserProvider>
      </div>
  );
}

export default App;