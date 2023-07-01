import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [games, setGames] = useState([]); 
    const [genres, setGenres] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errors, setErrors] = useState([]);
    
    const navigate = useNavigate();


    const checkLogin = () => {
        fetch('/me')
            .then(response => response.json())
            .then(data => {
                setUser(data)
        
                if (data.errors) {
                    setIsLoggedIn(false)
                    setErrors(data.errors)
                } else 
                    setIsLoggedIn(true)
            })
        }

    useEffect(() => {
        checkLogin()
    }, [isLoggedIn])

    useEffect(() => {
        fetch('/games')
            .then(response => response.json())
            .then(data => {
                setGames(data)
                console.log(data)
            })
    }, [isLoggedIn])


    useEffect(() => {
        fetch('/genres')
            .then(response => response.json())
            .then(data => {
                setGenres(data)
            })
    }, [isLoggedIn])

    const signup = (user) => {
        setUser(user)
        setIsLoggedIn(true)
    }

    const login = (user) => {
        setUser(user)
        setIsLoggedIn(true)
    }

    const logout = () => {
        setUser({})
        setIsLoggedIn(false)
        navigate('/login')
        setErrors([])
    }

    const deleteAccount = () => {
        fetch(`/users/${user.id}`, {
            method: 'DELETE'
        })
                logout()
    }

    const editProfile = (profile) => {
        fetch(`/profiles/${profile.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profile),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            setUser({ ...user, profile: data }); // Update only the profile property
          });

      };

      const addProfile = (newProfile) => {
        fetch('/profiles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProfile)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUser({ ...user, profile: data })}) // Update only the profile property
        }


    return(
        <UserContext.Provider value={{
            user,
            genres,
            isLoggedIn,
            errors,
            signup,
            login,
            logout,
            editProfile,
            addProfile,
            games,
            deleteAccount
        }}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }