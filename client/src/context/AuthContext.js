import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errors, setErrors] = useState([]);
    
    const navigate = useNavigate();
    const location = useLocation();

    const checkLogin = () => {
        fetch('/me')
            .then(response => response.json())
            .then(data => {
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

    const handleSignup = (user) => {
        setUser(user)
        setIsLoggedIn(true)
    }

    const handleLogin = (user) => {
        setUser(user)
        setIsLoggedIn(true)
    }

    const handleLogout = () => {
        setUser({})
        setIsLoggedIn(false)
        navigate('/login')
        setErrors([])
    }


    return(
        <UserContext.Provider value={{
            user,
            isLoggedIn,
            errors,
            handleSignup,
            handleLogin,
            handleLogout
        }}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }