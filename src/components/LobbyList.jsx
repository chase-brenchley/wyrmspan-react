import React from 'react'

function LobbyList (props) {
  return (
    <div>
      <h2>LobbyList </h2>
      <pre>{JSON.stringify(props)}</pre>
      {props.openLobbies?.length > 0 ? (
        <ul>
          {props.openLobbies.map(lobby => (
            <li key={lobby.id}>
              {lobby.id} players: {lobby.players?.length} / 5{' '}
              <button
                type='button'
                onClick={() => props.joinGameHandler(lobby.id)}
              >
                Join Game
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>bye</div>
      )}
    </div>
  )
}

export default LobbyList
