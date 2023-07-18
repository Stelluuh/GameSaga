import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/AuthContext'
import '../Styles/Signup.css'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errorsList, setErrorsList] = useState([])
 
  const { signup } = useContext(UserContext);

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: passwordConfirmation
      })
    })
      .then(response => response.json())
      .then(user => {
        if (!user.errors) {
          signup(user)
          navigate(`/create-profile`);
        } else {
          const listErrors = user.errors.map((error) => <li>{error}</li>)
          setErrorsList(listErrors)
        }
      })
  }

  
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="minimum of 8 characters"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          type="password"
          
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        {errorsList.length > 0 && (
          <ul className="errors-list">
            {errorsList}
          </ul>
        )}
      </form>
    </div>
  )
}

export default Signup
