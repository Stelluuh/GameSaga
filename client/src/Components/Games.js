import React, { useContext } from 'react'
import { UserContext } from '../context/AuthContext'

const Games = () => {
  const { isLoggedIn, games } = useContext(UserContext)

  console.log(games)

  
  if (!isLoggedIn) {
    return <h3>Please login to view your games.</h3>
  } else {
  return (
    <div>
      <h1>Browse Games</h1>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Genre</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.name}</td>
              <td>{game.genre}</td>
              <td>{game.platform}</td>
            </tr>
          ))}
        </tbody>
      </table>      
    </div>
  )}
}

export default Games
