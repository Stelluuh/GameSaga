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


    return(
        <UserContext.Provider value={{
            user,
            isLoggedIn,
            errors,
            signup,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }