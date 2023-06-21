import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/AuthContext'
import '../Styles/Signup.css'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
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
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      })
    })
      .then(response => response.json())
      .then(user => {
        if (!user.errors) {
          console.log(user)
          signup(user)
          navigate(`/create-profile`);
        } else {
          const listErrors = user.errors.map((error) => <li>{error}</li>)
          setErrorsList(listErrors)
          setUsername('')
          setEmail('')
          setPassword('')
          setPasswordConfirmation('')
        }
      })
  }

  
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
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
