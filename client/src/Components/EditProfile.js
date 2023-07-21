import React, { useContext, useState } from 'react';
import { UserContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Styles/EditProfile.css';

const EditProfile = ({ setEditing }) => {
  const { user, genres, profile, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.profile?.name || '');
  const [age, setAge] = useState(user.profile?.age || '');
  const [avatar, setAvatar] = useState(user.profile?.avatar || '');
  const [bio, setBio] = useState(user.profile?.bio || '');
  const [favoriteGenre, setFavoriteGenre] = useState(user.profile?.favorite_genre || '');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProfile = {
      ...user.profile,
      name,
      age,
      avatar,
      bio,

      favorite_genre: favoriteGenre,

    };

    
      fetch(`/profiles/${user.profile.id}`, {
        method: 'PATCH',  
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) {
            const errorList = data.errors.map((error) => <li key={error}>{error}</li>);
            setErrors(errorList);
            console.log(errorList);
          } else {
            setUser({ ...user, profile: data });
            setEditing(false);
          }
        });
      }


  //
  const genresList = genres && Object.values(genres).flat().map((genre) => genre.name);

  // console.log(genresList)

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
          Favorite Genre:
          <select value={favoriteGenre} onChange={(e) => setFavoriteGenre(e.target.value)}>
            <option value="N/A">Select Genre</option>
            {genresList.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
        
        <button type="submit">Save Profile</button>
        <br />
        <button type="button" onClick={() => setEditing(false)}>Cancel</button>
      </form>
      <div>
        <ul className="errors-list">
          {errors}
        </ul>
      </div>
    </div>
  );
};

export default EditProfile;
