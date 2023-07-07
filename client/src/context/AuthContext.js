import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [allGames, setAllGames] = useState([]); 
    const [genres, setGenres] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errors, setErrors] = useState([]);
    
    const navigate = useNavigate();


    const checkLogin = () => {
        fetch('/me')
            .then(response => response.json())
            .then(data => {
                
                if (data.errors) {
                    setIsLoggedIn(false)
                    setErrors(data.errors)
                } else 
                setIsLoggedIn(true)
                setUser(data)
                // console.log(data)
            })
        }

    useEffect(() => {
        checkLogin()
    }, [isLoggedIn])

    

    useEffect(() => {
        fetch('/games')
            .then(response => response.json())
            .then(data => {
                setAllGames(data)
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
                
                setUser({ ...user, profile: data })}) // Update only the profile property
        }

    const addGameLog = (newGameLog) => {
        fetch('/game_logs', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(newGameLog)
        })
            .then(response => response.json())
            .then(newLog => {
                // console.log(newLog)
                setUser({ ...user, game_logs: [...user.game_logs, newLog], games: [...user.games, newLog.game] })
            })
    }
 
    const editGameLog = (gameLogId) => {
        fetch(`/game_logs/${gameLogId}`, {
            method: 'PATCH',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(gameLogId)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // setUser({ ...user, game_logs: [...user.game_logs, data] })
            })
    }

    const deleteGameLog = (gameLogId) => {
        fetch(`/game_logs/${gameLogId}`, {
            method: 'DELETE'
        })
        .then(setUser({ ...user, game_logs: user.game_logs.filter(gameLog => gameLog.id !== gameLogId), games: user.games.filter( game => game.id !== game.game_logs.find(gameLog => gameLog.id === gameLogId)?.game_id)}))
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
            allGames,
            deleteAccount,
            addGameLog,
            editGameLog,
            deleteGameLog
        }}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }