import React, { useState, useContext } from 'react'
import { UserContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../Styles/CreateProfile.css'


const CreateProfile = () => {
    const { addProfile, genres, user, isLoggedIn } = useContext(UserContext)
    
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [avatar, setAvatar] = useState('https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4_medium.png')
    const [bio, setBio] = useState('')
    // const [totalGamesPlayed, setTotalGamesPlayed] = useState(0)
    const [favoriteGenre, setFavoriteGenre] = useState('')
    // const [hoursPlayed, setHoursPlayed] = useState(0)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Profile Created')
        const newProfile = {
            name: name,
            age: age,
            avatar: avatar,
            bio: bio,
            // total_games_played: totalGamesPlayed,
            favorite_genre: favoriteGenre,
            // hours_played: hoursPlayed,
        }
        addProfile(newProfile)
        navigate(`/profiles/${user.username}`)
    }

    
    if (!isLoggedIn) {
        return <h3>Please login to view your profile.</h3>
    } else {

        const genresList = genres && Object.values(genres).flat().map((genre) => genre.name);
  return (
    <div>
        <form onSubmit={handleSubmit} className="create-profile-form">
            <h1>Create Profile</h1>
            <label> Name: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label> Age: </label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            <label> Avatar: </label>
            <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            <label> Bio: </label>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
            {/* <label> Total Games Played: </label> */}
            {/* <input type="number" value={totalGamesPlayed} onChange={(e) => setTotalGamesPlayed(e.target.value)} /> */}
            <label> Favorite Genre: </label>
            <select value={favoriteGenre} onChange={(e) => setFavoriteGenre(e.target.value)}>
                <option value="N/A">Select Genre</option>
                {genresList.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                 ))}
          </select>
            {/* <label> Hours Played: </label> */}
            {/* <input type="number" value={hoursPlayed} onChange={(e) => setHoursPlayed(e.target.value)} /> */}
            <br />
            <button type="submit">Submit</button>
        </form>
      
    </div>
  )
}
}

export default CreateProfile
