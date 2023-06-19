import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';

const ProfileSetup = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);
    const [favoriteGenre, setFavoriteGenre] = useState('');
    const [hoursPlayed, setHoursPlayed] = useState(0);

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('profiles', {
            method: 'POST',
            headers: 'Content-Type': 'application/json',
            body: JSON.stringify({
                name: name,
                age: age,
                avatar: avatar,
                bio: bio,
                total_games_played: totalGamesPlayed,
                favorite_genre: favoriteGenre,
                hours_played: hoursPlayed,
                user_id: user.id
            })
        })
            .then(response => response.json())
            .then(profile => {
                navigate(`profiles/$user.id`)
            })
    }

  return (
    <div>
        <h2>Profile Setup</h2>
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
                type="number"
                placeholder="age"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="avatar"
                id="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="bio"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
            <br />
            <input
                type="number"
                placeholder="total games played"
                id="totalGamesPlayed"
                value={totalGamesPlayed}
                onChange={(e) => setTotalGamesPlayed(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="favorite genre"
                id="favoriteGenre"
                value={favoriteGenre}
                onChange={(e) => setFavoriteGenre(e.target.value)}
            />
            <br />
            <input
                type="number"
                placeholder="hours played"
                id="hoursPlayed"
                value={hoursPlayed}
                onChange={(e) => setHoursPlayed(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ProfileSetup
