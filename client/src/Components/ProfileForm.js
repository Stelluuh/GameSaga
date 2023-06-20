import React, { useContext, useState } from 'react';
import { UserContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Styles/ProfileForm.css';

const ProfileForm = ({ setEditing }) => {
  const { user, addProfile, genres } = useContext(UserContext);
  const [name, setName] = useState(user.profile.name || '');
  const [age, setAge] = useState(user.profile.age || '');
  const [avatar, setAvatar] = useState(user.profile.avatar || '');
  const [bio, setBio] = useState(user.profile.bio || '');
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(user.profile.total_games_played || 0);
  const [favoriteGenre, setFavoriteGenre] = useState(user.profile.favorite_genre || '');
  const [hoursPlayed, setHoursPlayed] = useState(user.profile.hours_played || 0);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProfile = {
      ...user.profile,
      name,
      age,
      avatar,
      bio,
      total_games_played: totalGamesPlayed,
      favorite_genre: favoriteGenre,
      hours_played: hoursPlayed,
    };

    addProfile(updatedProfile);
    setEditing(false);

  };

  return (
    <div className="profile-form-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <label>
          Avatar:
          <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
        </label>
        <label>
          Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <label>
          Total Games Played:
          <input
            type="number"
            value={totalGamesPlayed}
            onChange={(e) => setTotalGamesPlayed(e.target.value)}
          />
        </label>
        <label>
          Favorite Genre:
          <select value={favoriteGenre} onChange={(e) => setFavoriteGenre(e.target.value)}>
            <option value="N/A">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          {/* <input
            type="text"
            value={favoriteGenre}
            onChange={(e) => setFavoriteGenre(e.target.value)}
          /> */}
        </label>
        <label>
          Hours Played:
          <input type="number" value={hoursPlayed} onChange={(e) => setHoursPlayed(e.target.value)} />
        </label>
        <button type="submit">Save Profile</button>
        <button type="button" onClick={() => setEditing(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default ProfileForm;
