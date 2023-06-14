import React, { useContext} from 'react'
import { UserContext } from '../context/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const {isLoggedIn } = useContext(UserContext)

    const navigate = useNavigate()

    if(isLoggedIn) {
        return(
            <div>
                <NavLink to="/">
                    <button>Home</button>
                </NavLink>
                <NavLink to="/logout">
                    <button>Logout</button>
                </NavLink>
            </div>
        )
    } else {
        return (
            <div>
                <NavLink to="/login">
                    <button>Login</button>
                </NavLink>
                <NavLink to="/signup">
                    <button>Signup</button>
                </NavLink>
            </div>
        )
    }
}

export default NavBar
