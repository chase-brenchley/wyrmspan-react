import React from 'react'
import PropTypes from 'prop-types'

function Lobby (props) {
  return (
    <div>
      <h2>Game Lobby</h2>
      <pre>{JSON.stringify(props)}</pre>
      <h2>{props.players?.length} / 5 players</h2>
      {props.players && props.players.length && (
        <ol>
          {props.players.map((player, i) => (
            <li key={player}>{player}</li>
          ))}
        </ol>
      )}
      <button
        type='button'
        disabled={!props.players.length > 1 ? 'true' : false}
      >
        Start Game
      </button>
    </div>
  )
}

Lobby.propTypes = {}

export default Lobby
