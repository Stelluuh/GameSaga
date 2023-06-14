import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/AuthContext'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errorsList, setErrorsList] = useState([])
  const { handleSignup } = useContext(UserContext)

  return (
    <div>
      
    </div>
  )
}

export default Signup
