import React, { useContext } from 'react'
import { UserContext } from '../context/AuthContext'
import MyGameCard from './MyGameCard'

const MyGames = () => {
    const { user } = useContext(UserContext)
    console.log(user)

    const gameList = user?.games?.map(game => {
        return <MyGameCard key={game.id} game={game} />
    })

    

  return (
    <div>
      <h1>My Games!</h1>
      {gameList}
    </div>
  )
}

export default MyGames
