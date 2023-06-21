import React, { useState, useContext } from 'react'
import { UserContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const CreateProfile = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [avatar, setAvatar] = useState('')
    const [bio, setBio] = useState('')
    const [totalGamesPlayed, setTotalGamesPlayed] = useState(0)
    const [favoriteGenre, setFavoriteGenre] = useState('')
    const [hoursPlayed, setHoursPlayed] = useState(0)

    const { user, addProfile, genres } = useContext(UserContext)


  return (
    <div>
      
    </div>
  )
}

export default CreateProfile
