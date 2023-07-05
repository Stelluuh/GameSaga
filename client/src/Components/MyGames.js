import React, { useContext } from 'react'
import { UserContext } from '../context/AuthContext'
import MyGameCard from './MyGameCard'

const MyGames = () => {
    const { user, isLoggedIn } = useContext(UserContext)
    console.log(user)

    const gameList = user?.games?.map(game => {
        return <MyGameCard key={game.id} game={game} />
    })

    return (
      <div>
        {isLoggedIn ? (
          <>
          {gameList}
          </>
          ) : (
            <h3>Please Login or Signup</h3>
          )}
      </div>
    )
}

export default MyGames
